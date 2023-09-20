import { createContext, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import useGetCryptoCurrencies from "../hooks/useGetCryptoCurrencies";
import useGetTimeframes from "../hooks/useGetTimeframes";
import { ReactNode } from "react";
export const GlobalCtx = createContext(null);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [cryptoCurrencies, getCryptocurrenciesErrorMsg] = useGetCryptoCurrencies();
  const [timeframes, getTimeframesErrorMsg] = useGetTimeframes();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const setErrorMsgCallback = useCallback((msg: string) => {
    setErrorMsg(msg);
  }, []);

  useEffect(() => {
    setErrorMsg(getCryptocurrenciesErrorMsg);
  }, [getCryptocurrenciesErrorMsg, getTimeframesErrorMsg]);

  return <GlobalCtx.Provider value={{ cryptoCurrencies: cryptoCurrencies, timeframes: timeframes, errorMsg: errorMsg, setErrorMsgCallback: setErrorMsgCallback }}>{children}</GlobalCtx.Provider>;
};

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
