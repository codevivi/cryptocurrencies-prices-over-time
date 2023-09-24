import getPreloadedDefaultExchange from "../externalApis/defaultExchange.js";
import { AsyncRequestHandler } from "../utils/types.js";

const getCurrencies: AsyncRequestHandler = async (req, res, next) => {
  let ex = await getPreloadedDefaultExchange();
  let currencies = ex.customizedCurrencies;
  res.status(200).json({ type: "success", message: "Currencies", data: currencies });
};

export default getCurrencies;
