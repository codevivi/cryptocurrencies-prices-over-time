import { Exchange, Currency, Dictionary } from "ccxt";
import { getExchange } from "./externalApis.js";

export const defaultExchangeName = "kucoin";

type CustomizedCurrency = { id: string; code: string; name: string; displayName: string };
interface CustomizedExchange extends Exchange {
  customizedCurrencies?: CustomizedCurrency[];
}

interface CurrencyMod extends Currency {
  name?: string;
  fullName?: string;
  info?: any;
}

const defaultExchange: CustomizedExchange = getExchange(defaultExchangeName);
let loadedTime: null | number = null;

const getPreloadedDefaultExchange = async () => {
  const now = Date.now();
  //load markets every hour (just a random number  to minimize requests);
  if (loadedTime === null || now - loadedTime > 60000 * 60) {
    await defaultExchange.loadMarkets();
    loadedTime = Date.now();
    let currencies = defaultExchange.currencies;
    if (!currencies || Object.keys(currencies).length === 0) {
      //if want to use other default exchange and getting this error, need to implement other way to get currencies;
      throw new Error("Not not fully implemented to work with all exchanges");
    }
    const hasOhlcv = defaultExchange.has.fetchOHLCV;
    if (!hasOhlcv) {
      throw new Error("Exchange does not support OHLCV data fetch");
    }
    defaultExchange.customizedCurrencies = customizeAndSortCurrencies(currencies);
  }
  return defaultExchange;
};

type CustomizeAndSortCurrencies = (currencies: Dictionary<Currency>) => CustomizedCurrency[];

const customizeAndSortCurrencies: CustomizeAndSortCurrencies = (currencies) => {
  let currenciesArr = [];
  for (const curr in currencies) {
    let currency = currencies[curr] as CurrencyMod;
    let name = currency.name || currency.info?.coinName || currency.info?.fullName || "";
    name = name.trim(); // one for sure was with spaces around and messed up sorting (in kucoin)
    currenciesArr.push({ id: currency.id, code: currency.code, name: name, displayName: `${name} (${currency.code})` });
  }
  currenciesArr.sort((a, b) => a.name.localeCompare(b.name));
  return currenciesArr;
};

export default getPreloadedDefaultExchange;
