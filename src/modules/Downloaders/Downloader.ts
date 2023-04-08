import FullMangaRequest from "../SanitizedUserInputs/FullMangaRequest.ts";

/**
 * This is the base class for all manga downloaders. It defines the signature of the downloadManga method that will be used to download a manga.
 */
abstract class Downloader {

    /**
     * Proceeds to download the manga specified by the mangaLink property, using the downloadOptions property.
     */
    public abstract downloadFullManga(fullMangaRequest : FullMangaRequest): Promise<void>;

    //public abstract downloadTome(tomeMangaRequest : TomeMangaRequest): Promise<void>;

    //public abstract downloadChapter(chapterMangaRequest : ChapterMangaRequest): Promise<void>;

    //public abstract downloadPage(pageMangaRequest : PageMangaRequest): Promise<void>;



}


export default Downloader;
