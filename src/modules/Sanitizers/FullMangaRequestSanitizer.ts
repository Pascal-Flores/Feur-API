import InvalidRequestError from "../Errors/InvalidRequestError";
import OutputFormat from "../OutputFormat";
import FullMangaOptions from "../RequestsOptions/FullMangaOptions";
import FullMangaRequest from "../SanitizedUserInputs/FullMangaRequest";
import { LinkValidator, SupportedWebsites } from "../LinkValidator";

class FullMangaRequestSanitizer {
    public static sanitize(userInput : any) : FullMangaRequest {
        if (!userInput.url || typeof userInput.url !== "string") {
            throw new InvalidRequestError("Invalid request manga url");
        }

        let website : SupportedWebsites;
        try {
            website = LinkValidator.isLinkSupported(userInput.url);
        }
        catch (error) {
            throw new InvalidRequestError("Manga URL provided is not supported");
        }

        const mangaURL : string = userInput.url;
        let options : FullMangaOptions;

        if (userInput.options && typeof userInput.options === "object") 
            options = this.sanitizeOptions(userInput.options);
        else
            options = {
                downloadChapters: true,
                outputFormat: OutputFormat.RAW
            };

        const sanitizedRequest : FullMangaRequest = {
            url: mangaURL,
            website : website,
            options: options
        };

        return sanitizedRequest;
   
    }

    private static sanitizeOptions(options : any) : FullMangaOptions {
        const sanitizedOptions : FullMangaOptions = {};
        if (options.downloadChapters  !== undefined && typeof options.downloadChapters === "boolean")
            sanitizedOptions.downloadChapters = options.downloadChapters;
        else 
            sanitizedOptions.downloadChapters = true;
        if (options.outputFormat !== undefined && typeof options.outputFormat === "string") 
            if (options.outputFormat === OutputFormat.CBZ || options.outputFormat === OutputFormat.CBR || options.outputFormat === OutputFormat.RAW)
                sanitizedOptions.outputFormat = options.outputFormat;
            else
                sanitizedOptions.outputFormat = OutputFormat.RAW;
        return sanitizedOptions;
    }

}

export default FullMangaRequestSanitizer;