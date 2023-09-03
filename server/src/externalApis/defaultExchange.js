import { getExchange } from "./externalApis.js";
const defaultExchange = getExchange("kucoin");
let loadedTime = null;

const getPreloadedDefaultExchange = async () => {
  const now = Date.now();
  //load markets every hour
  if (loadedTime === null || now - loadedTime > 60000 * 60) {
    await defaultExchange.loadMarkets();
    loadedTime = Date.now();
    let currencies = defaultExchange.currencies;
    if (!currencies || Object.keys(currencies).length === 0) {
      //if want to use other default exchange and getting this error, need to implement other way to get currencies;
      throw new Error("Not not fully implemented to work with all exchanges");
    }
    defaultExchange.currencies = customizeAndSortCurrencies(currencies);
  }
  return defaultExchange;
};

function customizeAndSortCurrencies(currencies) {
  let currenciesArr = [];
  for (const curr in currencies) {
    let currency = currencies[curr];
    currency.name = currency.name.trim(); // one for sure was with spaces around and messed up sorting
    currenciesArr.push({ id: currency.id, code: currency.code, name: currency.name, displayName: `${currency.name} (${currency.code})` });
  }
  currenciesArr.sort((a, b) => a.name.localeCompare(b.name));
  return currenciesArr;
}

export default getPreloadedDefaultExchange;
