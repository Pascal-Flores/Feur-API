class PuppeteerNotInitializedError extends Error {
    constructor(message : string) {
        super(message);
        this.name = "PuppeteerNotInitializedError";
    }
}

export default PuppeteerNotInitializedError;