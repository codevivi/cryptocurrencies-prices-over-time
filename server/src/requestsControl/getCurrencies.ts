import getPreloadedDefaultExchange from "../externalApis/defaultExchange.js";

async function getCurrencies(req, res, next) {
  let ex = await getPreloadedDefaultExchange();
  let currencies = ex.currencies;
  res.status(200).json({ type: "success", message: "Currencies", data: currencies });
}

export default getCurrencies;
