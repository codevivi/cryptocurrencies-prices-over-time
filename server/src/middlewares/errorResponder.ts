import CustomError from "../utils/CustomError.js";
import { NODE_ENV } from "../../config.js";
const errorResponder = (error, req, res, next) => {
  if (NODE_ENV === "development") {
    // for production could use some type of logger
    console.log(error);
  }

  if (error instanceof CustomError) {
    return res.status(error.code).json({
      type: error.type,
      message: error.message,
    });
  }

  res.status(500).json({
    type: "error",
    message: "Server Error",
  });
};

export default errorResponder;
