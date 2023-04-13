import { SupportedWebsites } from "../LinkValidator";
import FullMangaOptions from "../RequestsOptions/FullMangaOptions";

interface FullMangaRequest {
    url: string;
    website: SupportedWebsites;
    options: FullMangaOptions;
}

export default FullMangaRequest;