import CustomError from "../utils/CustomError.js";
import getPreloadedDefaultExchange from "../externalApis/defaultExchange.js";

const validatePriceDataQuery = async (req, res, next) => {
  const ex = await getPreloadedDefaultExchange();
  let currency = req.query.currency;
  let searchType = req.query.searchType;
  let timeframe = req.query.timeframe;
  let msg = "";
  let invalid = [];
  if (!currency || !timeframe || !searchType) {
    throw new CustomError(400, "failure", "Required query parameters: currency, timeframe, searchType");
  }
  if (searchType !== "select" && searchType !== "search") {
    throw new CustomError(400, "failure", "Provided searchType can only be 'select' or 'search'");
  }
  currency = currency.trim();
  if (currency.length > 30) {
    throw new CustomError(400, "failure", "Currency must not exceed 30 character");
  }
  const validTimeframes = ex.timeframes;
  if (!validTimeframes[timeframe]) {
    throw new CustomError(400, "failure", "Invalid timeframe");
  }

  next();
};

export default validatePriceDataQuery;
