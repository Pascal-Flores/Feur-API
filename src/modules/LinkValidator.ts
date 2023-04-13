import InvalidRequestError from "./Errors/InvalidRequestError";

class LinkValidator {
    /**
     * Checks wether the provided link is currently supported by the application
     * @param {string} link the link to check
     * @returns {SupportedWebsites | undefined} the website enum if the link is supported, undefined otherwise
     */
    public static isLinkSupported(link: string): SupportedWebsites {
        if (link.includes(SupportedWebsites.SUSHISCAN))
            return SupportedWebsites.SUSHISCAN;
        throw new InvalidRequestError("Unsupported manga url");
    }
}

enum SupportedWebsites {
    SUSHISCAN = "https://sushiscan.net"
}


export { LinkValidator, SupportedWebsites };

