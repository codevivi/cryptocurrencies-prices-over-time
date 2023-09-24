import ccxt, { Precise, Exchange } from "ccxt";

//to initialize exchange by id(string) as ts does't let
const CCXT = ccxt as any;

const exchanges: any = {};
let exchangesNames = ccxt.exchanges;

// To make sure only one instance of every exchange is created, in case want to use more later.
// Using more than one instance of same exchange might exceed rate limit;
export const getExchange = (name: string) => {
  if (exchanges[name]) {
    return exchanges[name];
  }
  if (!exchangesNames.includes(name)) {
    throw new Error("Provided name is not in ccxt exchanges list, use function 'getExchangesNames' to get list of valid names");
  }

  let id = name.toLocaleLowerCase();
  let ex: Exchange = new CCXT[id]({ enableRateLimit: true }) as Exchange;
  exchanges[name] = ex;
  return ex;
};

export const getExchangesNames = () => {
  return ccxt.exchanges;
};
