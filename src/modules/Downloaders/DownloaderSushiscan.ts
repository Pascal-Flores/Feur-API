/*
import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';
import MangaDownloader from './manga-downloader';
import { DownloadOptions } from './download-options';
*/

import Downloader from "./Downloader.ts";

class DownloaderSushiscan extends Downloader {

    public async downloadFullManga(): Promise<void> {

        /*
        const browser = await puppeteer.launch({
            headless: false,
        });
    
        const page = await browser.newPage();
    
        await page.goto(this._mangaLink);
    
        const content : string = await page.content();
        const DOMContent : cheerio.CheerioAPI = cheerio.load(content);
        let firstVolumeLink : string = '';
        DOMContent('[data-num="Volume 1"]').find('a').each((index, element) => {
            firstVolumeLink = element.attribs.href;
        });
        if (firstVolumeLink !== '')
            await page.goto(firstVolumeLink);
        else
            console.log("No volume 1 found");
        return Promise.resolve(); */
    }
}

export default DownloaderSushiscan;