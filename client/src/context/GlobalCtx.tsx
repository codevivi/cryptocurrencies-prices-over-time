import { createContext, useCallback, useEffect, useState } from "react";
import { type CryptoCurrencies, useGetCryptoCurrencies } from "../hooks/useGetCryptoCurrencies.js";
import { type Timeframes, useGetTimeframes } from "../hooks/useGetTimeframes.js";
import { ReactNode } from "react";

enum ServerErrorMsg {
  default = "Sorry, can't communicate with server.",
  empty = "",
}

export type GlobalContextValue = {
  cryptoCurrencies: CryptoCurrencies;
  timeframes: Timeframes;
  pageErrorMsg: ServerErrorMsg;
};

export const GlobalCtx = createContext<GlobalContextValue | null>(null);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [cryptoCurrencies, isGetCryptoCurrenciesError] = useGetCryptoCurrencies();
  const [timeframes, isGetTimeframesError] = useGetTimeframes();
  const [pageErrorMsg, setPageErrorMsg] = useState<ServerErrorMsg>(ServerErrorMsg.empty);

  useEffect(() => {
    if (isGetCryptoCurrenciesError || isGetTimeframesError) {
      setPageErrorMsg(ServerErrorMsg.default);
    }
  }, [isGetCryptoCurrenciesError, isGetTimeframesError]);

  return <GlobalCtx.Provider value={{ cryptoCurrencies: cryptoCurrencies, timeframes: timeframes, pageErrorMsg: pageErrorMsg }}>{children}</GlobalCtx.Provider>;
};
