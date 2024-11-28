export default class HttpError extends Error {
    constructor(status, message, errors) {
        super(message);
        this.statusCode = status;
        this.errors = errors;
    }
}