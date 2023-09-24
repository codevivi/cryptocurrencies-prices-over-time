import CustomError from "../utils/CustomError.js";
import getPreloadedDefaultExchange from "../externalApis/defaultExchange.js";
import { StatusCode } from "status-code-enum";
import { AsyncRequestHandler } from "../utils/types.js";

const validatePriceDataQuery: AsyncRequestHandler = async (req, res, next) => {
  const ex = await getPreloadedDefaultExchange();
  let currency = req.query.currency;
  let limit = req.query.limit;
  let timeframe = req.query.timeframe as string | number;
  let msg = "";
  let invalid = [];
  if (!currency || !timeframe || !limit) {
    throw new CustomError(StatusCode.ClientErrorBadRequest, "Required query parameters: currency, timeframe, limit");
  }
  currency = currency.toString().trim();
  if (currency.length > 30) {
    throw new CustomError(StatusCode.ClientErrorBadRequest, "Currency must not exceed 30 character");
  }
  const validTimeframes = ex.timeframes;
  if (timeframe && !validTimeframes[timeframe]) {
    throw new CustomError(StatusCode.ClientErrorBadRequest, "Invalid timeframe");
  }

  next();
};

export default validatePriceDataQuery;
