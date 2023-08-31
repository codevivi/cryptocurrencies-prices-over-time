// error types:
// 'error' (for server errors and missing implementation),
// 'failure' (for client errors),
// 'error' (for server errors and missing implementation),
const validTypes = ["success", "failure", "error"];

class CustomError extends Error {
  constructor(httpErrorCode, type, message) {
    super(message);
    this.code = httpErrorCode;
    if (!validTypes.includes(type)) {
      throw new Error("invalid Error type, can be 'success', 'failure' or 'error'.");
    }
    this.type = type;
  }
}
export default CustomError;
