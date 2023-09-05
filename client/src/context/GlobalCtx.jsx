import { createContext, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import useGetCryptoCurrencies from "../hooks/useGetCryptoCurrencies";
import useGetTimeframes from "../hooks/useGetTimeframes";
export const GlobalCtx = createContext();

export const GlobalProvider = ({ children }) => {
  const [cryptoCurrencies, getCryptocurrenciesErrorMsg] = useGetCryptoCurrencies();
  const [timeframes, getTimeframesErrorMsg] = useGetTimeframes();
  const [errorMsg, setErrorMsg] = useState(null);

  const setErrorMsgCallback = useCallback((msg) => {
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
