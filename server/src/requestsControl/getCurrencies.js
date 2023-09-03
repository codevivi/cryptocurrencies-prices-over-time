import getPreloadedDefaultExchange from "../externalApis/defaultExchange.js";

export const getCurrencies = async (req, res, next) => {
  let ex = await getPreloadedDefaultExchange();
  let currencies = ex.currencies;
  res.status(200).json({ type: "success", data: currencies });
};
