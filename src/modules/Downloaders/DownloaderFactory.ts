import Downloader from "./Downloader";
import DownloaderSushiscan from "./DownloaderSushiscan";
import { SupportedWebsites } from "../LinkValidator";
import InternalServerError from "../Errors/InternalServerError";

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