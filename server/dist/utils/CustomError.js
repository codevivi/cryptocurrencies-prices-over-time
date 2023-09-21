// error types:
// 'error' (for server errors and missing implementation),
// 'failure' (for client errors),
const validTypes = ["failure", "error"];
class CustomError extends Error {
    constructor(httpErrorCode, type, message) {
        super(message);
        this.code = httpErrorCode;
        if (!validTypes.includes(type)) {
            throw new Error("invalid Error type, can be 'failure' or 'error'.");
        }
        this.type = type;
    }
}
export default CustomError;
