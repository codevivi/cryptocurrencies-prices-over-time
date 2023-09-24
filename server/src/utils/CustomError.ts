import { StatusCode } from "status-code-enum";

export enum CustomErrorTypes {
  FAILURE = "Client Error",
  ERROR = "Server Error",
}

class CustomError extends Error {
  type: CustomErrorTypes;
  httpStatusCode: StatusCode;
  constructor(httpStatusCode: StatusCode, message: string) {
    super(message);
    if (httpStatusCode < 400) {
      throw new Error("Valid httpStatusCode for CustomError must be 400 or greater.");
    }
    if (httpStatusCode < 500) {
      this.type = CustomErrorTypes.FAILURE;
    } else {
      this.type = CustomErrorTypes.ERROR;
    }
    this.httpStatusCode = httpStatusCode;
  }
}

export default CustomError;
