class InvalidRequestError extends Error {
    constructor(message : string) {
        super(message);
        this.name = "InvalidRequestError";
    }
}

export default InvalidRequestError;