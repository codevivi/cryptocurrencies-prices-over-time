import { getExchange } from "./externalApis.js";
export const defaultExchangeName = "kucoin";
const defaultExchange = getExchange(defaultExchangeName);
let loadedTime = null;
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
        defaultExchange.currencies = customizeAndSortCurrencies(currencies);
    }
    return defaultExchange;
};
function customizeAndSortCurrencies(currencies) {
    let currenciesArr = [];
    for (const curr in currencies) {
        let currency = currencies[curr];
        let name = currency.name || currency.info.coinName || currency.info.fullName || "";
        name = name.trim(); // one for sure was with spaces around and messed up sorting (in kucoin)
        currenciesArr.push({ id: currency.id, code: currency.code, name: name, displayName: `${currency.name} (${currency.code})` });
    }
    currenciesArr.sort((a, b) => a.name.localeCompare(b.name));
    return currenciesArr;
}
export default getPreloadedDefaultExchange;
