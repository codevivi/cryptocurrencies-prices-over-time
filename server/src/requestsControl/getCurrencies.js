import defaultExchange from "../externalApis/defaultExchange.js";

//Note. For some exchanges fetchCurrencies method returns empty object, or might need api key; https://github.com/ccxt/ccxt/issues/4400
export const getCurrencies = async (req, res, next) => {
  let currencies = await defaultExchange.fetchCurrencies();
  if (!currencies || Object.keys(currencies).length === 0) {
    throw new Error("getCurrencies function not fully implemented to work with all exchanges");
  }
  res.status(200).json({ type: "success", data: currencies });
};
