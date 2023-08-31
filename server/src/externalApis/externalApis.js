import ccxt from "ccxt";
const ex = new ccxt.binance({ enableRateLimit: true });

const exchanges = {};
let exchangesNames = ccxt.exchanges;

// To make sure only one instance of every exchange is created, in case want to use more later.
// Using more than one instance of same exchange might exceed rate limit;
export const getExchange = (name) => {
  if (exchanges[name]) {
    return exchanges[name];
  }
  if (!exchangesNames.includes(name)) {
    throw new Error("Provided name is not in ccxt exchanges list, use function 'getExchangesNames' to get list of valid names");
  }
  let ex = new ccxt[name]();
  exchanges[name] = ex;
  return ex;
};

export const getExchangesNames = () => {
  return ccxt.exchanges;
};
