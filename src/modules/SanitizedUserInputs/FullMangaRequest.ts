import { SupportedWebsites } from "../LinkValidator.ts";
import FullMangaOptions from "../RequestsOptions/FullMangaOptions.ts";

interface FullMangaRequest {
    url: string;
    website: SupportedWebsites;
    options: FullMangaOptions;
}

export default FullMangaRequest;