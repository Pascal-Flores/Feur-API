import { PathLike } from "fs";
import FullMangaRequest from "../SanitizedUserInputs/FullMangaRequest";
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import { Browser } from "puppeteer";
/**
 * This is the base class for all manga downloaders. It defines the signature of the downloadManga method that will be used to download a manga.
 */
abstract class Downloader {
    protected browser : Browser | undefined;
    /**
     * Proceeds to download the manga specified by the mangaLink property, using the downloadOptions property.
     */
    public abstract downloadFullManga(fullMangaRequest : FullMangaRequest): Promise<string>;

    //public abstract downloadTome(tomeMangaRequest : TomeMangaRequest): Promise<void>;

    //public abstract downloadChapter(chapterMangaRequest : ChapterMangaRequest): Promise<void>;

    protected constructor() {
        this.browser = undefined;
    }

    public async init() {
        puppeteer.use(StealthPlugin())
        this.browser = await puppeteer.launch({
            headless : true,
        });
        
    }
}


export default Downloader;
