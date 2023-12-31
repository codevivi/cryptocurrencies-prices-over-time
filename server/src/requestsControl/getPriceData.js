import getPreloadedDefaultExchange from "../externalApis/defaultExchange.js";
import { defaultExchangeName } from "../externalApis/defaultExchange.js";
import CustomError from "../utils/CustomError.js";

async function getPriceData(req, res, next) {
  let currency = req.query.currency;
  const timeframe = req.query.timeframe;
  let limit = req.query.limit;
  const searchType = req.query.searchType;

  const ex = await getPreloadedDefaultExchange();
  const currencies = ex.currencies;
  if (searchType === "search") {
    currency = currency.trim();
    currency = findSearchedCurrency(currency, currencies);
    if (!currency) {
      throw new CustomError(404, "failure", `Searched currency does not exist in ${defaultExchangeName} exchange.`);
    }
  }

  let symbol = `${currency}/USDT`;
  if (!ex.markets[symbol]) {
    throw new CustomError(404, "failure", `Sorry no data for ${currency} in USDT`);
  }
  let data = await ex.fetchOHLCV(symbol, timeframe, undefined, limit);
  data = { chartData: data, symbol: symbol, priceInCurrency: "USDT" };
  res.status(200).json({ type: "success", message: "Price data", data: data });
}

export default getPriceData;

function findSearchedCurrency(currency, currencies) {
  currency = currency.toUpperCase();
  let find = currencies.find((curr) => {
    let name = curr.name.toUpperCase();
    let code = curr.code;
    if (code === currency || name === currency) {
      return true;
    }
    return false;
  });
  if (find) {
    return find.code;
  }
  return false;
}
