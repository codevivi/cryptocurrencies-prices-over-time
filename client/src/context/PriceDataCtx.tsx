import { createContext } from "react";
import PropTypes from "prop-types";
import useGetPricesOverTime from "../hooks/useGetPricesOverTime";
export const PriceDataCtx = createContext();

export const PriceDataProvider = ({ children }) => {
  const [priceData, loadingPriceData, getPricesErrorMsg, clearGetPricesErrorMsg, setReqQueryCallback] = useGetPricesOverTime();

  return <PriceDataCtx.Provider value={{ priceData: priceData, loadingPriceData: loadingPriceData, getPricesErrorMsg: getPricesErrorMsg, clearGetPricesErrorMsg: clearGetPricesErrorMsg, setReqQueryCallback: setReqQueryCallback }}>{children}</PriceDataCtx.Provider>;
};

PriceDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
