import CustomError from "../utils/CustomError.js";
import { NODE_ENV } from "../config.js";
import { CustomErrorTypes } from "../utils/CustomError.js";
import { ErrorRequestHandler } from "express";
const errorResponder: ErrorRequestHandler = (error, req, res, next) => {
  if (NODE_ENV === "development") {
    // for production could use some type of logger
    console.log(error);
  }

  if (error instanceof CustomError) {
    return res.status(error.httpStatusCode).json({
      type: error.type,
      message: error.message,
    });
  }

  res.status(500).json({
    type: CustomErrorTypes.ERROR,
    message: "Internal Server Error",
  });
};

export default errorResponder;
