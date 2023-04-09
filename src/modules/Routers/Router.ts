import { Router } from "https://deno.land/x/oak/mod.ts";
import FullMangaRequest from "../SanitizedUserInputs/FullMangaRequest.ts";
import FullMangaRequestSanitizer from "../Sanitizers/FullMangaRequestSanitizer.ts";
import Downloader from "../Downloaders/Downloader.ts";
import DownloaderFactory from "../Downloaders/DownloaderFactory.ts";
import { Body } from "https://deno.land/x/oak@v12.1.0/body.ts";

const downloadRouter = new Router();
downloadRouter.post("/download/full-manga/", async (ctx) => {
    const body : Body = ctx.request.body();
    const values = await body.value;

    if (!values) {
        ctx.response.status = 400;
        ctx.response.body = "Invalid request";
        return;
    }
    let sanitizedRequest : FullMangaRequest;
    try {
        sanitizedRequest = FullMangaRequestSanitizer.sanitize(values);
    }
    catch (error) {
        ctx.response.status = 400;
        ctx.response.body = error.message;
        return;
    }
    let downloader : Downloader;
    try {
        downloader = await DownloaderFactory.createDownloader(sanitizedRequest.website);
    }
    catch (error) {
        ctx.response.status = 500;
        ctx.response.body = error.message;
        return;
    }
    
    const downloadedManga : Uint8Array = await Deno.readFile("/home/pascal/Documents/projets perso/Feur-API/src/modules/Routers/BerserkTome1-001.zip");


    ctx.response.status = 200;
    ctx.response.headers.set("Content-Type", "application/zip");
    ctx.response.body = downloadedManga;

});

export default downloadRouter;