import FullMangaRequest from "../SanitizedUserInputs/FullMangaRequest";
import Downloader from "./Downloader";
import PuppeteerNotInitializedError from "../Errors/PuppeteerNotInitializedError";
import { Page } from 'puppeteer'
import { PathLike, existsSync, mkdirSync, } from "fs";
import { spawn, spawnSync } from "child_process";
import { randomBytes, randomInt } from "crypto";
import { basename } from "path";
import { queue } from 'async';
import { cpus } from "os";

class DownloaderSushiscan extends Downloader {

    public async downloadFullManga(fullMangaRequest : FullMangaRequest): Promise<string> {
        if (this.browser === undefined)
            throw new PuppeteerNotInitializedError("Call to download method before initializing with init().")

        let volumesLinks : string[];
        try {
            volumesLinks = (await this.getVolumesLinks(fullMangaRequest.url, fullMangaRequest.options.downloadChapters)).reverse();
        }
        catch (error) {
            throw error;
        }

        const page : Page = await this.browser.newPage();

        for (const volumeLink of volumesLinks) {
            console.log("Downloading : "+volumeLink)
            await this.downloadVolume(volumeLink, fullMangaRequest, page);
        }

        await page.close();
        

        return process.env.DOWNLOAD_PATH+basename(fullMangaRequest.url); 
    }

    private async getVolumesLinks(fullMangaUrl : string, downloadChapters : boolean | undefined) : Promise<string[]> {
        if (this.browser === undefined) 
            throw new PuppeteerNotInitializedError("Call to download method before initializing with init().")
        
        const page = await this.browser?.newPage()

        await page.goto(fullMangaUrl)

        const volumesLinks: string[] = await page.evaluate((downloadchapters: boolean | undefined) => {
            const volumesLinks: string[] = [];
            const ulElement = document.querySelector('#chapterlist > ul');
            const liElements = ulElement?.querySelectorAll('li');
            liElements?.forEach(li => {
              const isChapter = li.getAttribute('data-num')?.toLowerCase().includes('chapitre');
              if (!isChapter || downloadchapters) {
                const aElement = li.querySelector('a');
                const href = aElement?.getAttribute('href');
                if (href) {
                  volumesLinks.push(href);
                }
              }
            });
            return volumesLinks;
          }, downloadChapters); // true si on veut ajouter tous les hrefs, false sinon
        
          await page.close();
          return volumesLinks;


    }

    private async downloadVolume(volumeLink : string, fullMangaRequest : FullMangaRequest, page : Page) {
        await page.goto(volumeLink);

            try {
                await page.select('#readingmode', 'full');
            }
            catch (error) {
                console.log("No page reading mode found");
                throw new Error("No page reading mode found");
            }

            await page.waitForSelector('#readerarea > img');
            const imagesLinks : string[] = await page.evaluate(() => {
                const imagesLinks : string[] = [];
                const imgElements = document.querySelectorAll('#readerarea > img');
                imgElements.forEach(img => {
                    imagesLinks.push(img.getAttribute('data-src') || img.getAttribute('src') || '')
                })
                return imagesLinks;
            })
            const currentVolume : string = basename(volumeLink).split('-').slice(basename(volumeLink).split('-').length - 2).join(' ')
            const downloadPath = process.env.DOWNLOAD_PATH+basename(fullMangaRequest.url)+'/'+currentVolume;
            if (!existsSync(downloadPath))
                mkdirSync(downloadPath, {recursive: true});
    
            imagesLinks.forEach( (image) => {
                const randomUserAgent = randomBytes(randomInt(10, 20)).toString('hex');
                const wget = spawnSync('wget', [image, '-P', downloadPath, '--user-agent', randomUserAgent]);
            })


    }

    public constructor() {
        super();
    }
}

export default DownloaderSushiscan;