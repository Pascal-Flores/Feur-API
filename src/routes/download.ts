import fastify, { FastifyInstance, FastifyPluginCallback, FastifyReply, FastifyRequest } from "fastify";
import FullMangaRequest from "../modules/SanitizedUserInputs/FullMangaRequest";
import FullMangaRequestSanitizer from "../modules/Sanitizers/FullMangaRequestSanitizer";
import Downloader from "../modules/Downloaders/Downloader";
import DownloaderFactory from "../modules/Downloaders/DownloaderFactory";
import { PathLike, createReadStream, openSync, readFileSync } from "fs";
import Packager from "../modules/Packager/Packager";
import OutputFormat from "../modules/OutputFormat";
import { basename } from "path";

const download = (fastify : FastifyInstance, _opts : any, done : any) => {
    fastify.post("/full-manga", downloadFullManga);
    done();
}

async function downloadFullManga(request : FastifyRequest, reply : FastifyReply) {
    const values = request.body;

    if (!values) {
        reply.code(400);
        reply.type('application/json')
        reply.send(
            {
                "error-code" : 400,
                "message" : "Bad Request : No body provided"
            }
        )
        return;
    }
    let sanitizedRequest : FullMangaRequest;
    try {
        sanitizedRequest = FullMangaRequestSanitizer.sanitize(values);
    }
    catch (error) {
        reply.code(400);
        reply.type('application/json')
        reply.send(
            {
                "error-code" : 400,
                "message" : `Bad request : Invalid request body`
            }
        )
        return;
    }
    let downloader : Downloader;
    try {
        downloader = await DownloaderFactory.createDownloader(sanitizedRequest.website);
        await downloader.init();
    }
    catch (error) {
        reply.code(500);
        reply.type('application/json')
        reply.send(
            {
                "error-code" : 500,
                "message" : "Internal Server Error : Something went wrong during request's processing."
            }
        )
        return;
    }
    
    let downloadedMangaPath : PathLike
    try {
        downloadedMangaPath = await downloader.downloadFullManga(sanitizedRequest);
    }
    catch(error) {
        reply.code(500);
        reply.type('application/json')
        reply.send(
            {
                "error-code" : 500,
                "message" : "Internal Server Error : The manga could not be downloaded correctly."
            }
        )
        return;
    }

    await Packager.packageFullManga(downloadedMangaPath, sanitizedRequest.options.outputFormat || OutputFormat.RAW);

    const downloadedMangaStream = createReadStream(downloadedMangaPath+".zip", 'utf-8')
    console.log(downloadedMangaPath+".zip");

    reply.code(200);
    reply.header('Content-Type', 'application/octet-stream');
    reply.send(downloadedMangaStream);

}

export default download;