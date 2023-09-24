import getPreloadedDefaultExchange from "../externalApis/defaultExchange.js";
import { defaultExchangeName } from "../externalApis/defaultExchange.js";
import CustomError from "../utils/CustomError.js";
import { StatusCode } from "status-code-enum";
import { RequestHandler } from "express";
import { AsyncRequestHandler } from "../utils/types.js";

const getPriceData: AsyncRequestHandler = async (req, res, next) => {
  let currency = req.query.currency;
  const timeframe = req.query.timeframe as string | number;
  let limit = req.query.limit;
  let limitNum = limit ? Number(limit) : undefined;

  const ex = await getPreloadedDefaultExchange();
  const currencies = ex.currencies;

  let symbol = `${currency}/USDT`;
  if (!ex.markets[symbol]) {
    throw new CustomError(StatusCode.ClientErrorNotFound, `Sorry no data for ${currency} in USDT`);
  }

  let data = await ex.fetchOHLCV(symbol, timeframe as string | undefined, undefined, limitNum);
  let customData = { chartData: data, symbol: symbol, priceInCurrency: "USDT" };
  res.status(200).json({ type: "success", message: "Price data", data: customData });
};

export default getPriceData;
