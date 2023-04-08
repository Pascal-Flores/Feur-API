import Downloader from "./Downloader.ts";
import DownloaderSushiscan from "./DownloaderSushiscan.ts";
import { SupportedWebsites } from "../LinkValidator.ts";
import InternalServerError from "../Errors/InternalServerError.ts";

class DownloaderFactory {
    public static async createDownloader(website : SupportedWebsites): Promise<Downloader> {
        switch (website) {
            case SupportedWebsites.SUSHISCAN:
                return new DownloaderSushiscan();
            default:
                throw new InternalServerError("Something went wrong");
        }
    }
}

export default DownloaderFactory;