import CustomError from "../utils/CustomError.js";
import { StatusCode } from "status-code-enum";
import { RequestHandler } from "express";

const errorOnWrongEndPoint: RequestHandler = (req, res, next) => {
  throw new CustomError(StatusCode.ClientErrorNotFound, "Endpoint not found");
};

export default errorOnWrongEndPoint;
