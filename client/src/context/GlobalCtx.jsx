import { createContext, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import useCryptoCurrencies from "../hooks/useCryptoCurrencies";
export const GlobalCtx = createContext();

export const GlobalProvider = ({ children }) => {
  const [cryptoCurrencies, getCryptocurrenciesErrorMsg] = useCryptoCurrencies();
  const [errorMsg, setErrorMsg] = useState(null);

  const setErrorMsgCallback = useCallback((msg) => {
    setErrorMsg(msg);
  });

  useEffect(() => {
    setErrorMsg(getCryptocurrenciesErrorMsg);
  }, [getCryptocurrenciesErrorMsg]);

  return <GlobalCtx.Provider value={{ cryptoCurrencies: cryptoCurrencies, errorMsg: errorMsg, setErrorMsgCallback: setErrorMsgCallback }}>{children}</GlobalCtx.Provider>;
};

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
