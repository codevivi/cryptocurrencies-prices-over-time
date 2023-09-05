import { createContext } from "react";
import PropTypes from "prop-types";
import useGetPricesOverTime from "../hooks/useGetPricesOverTime";
export const PriceDataCtx = createContext();

export const PriceDataProvider = ({ children }) => {
  const [priceData, loadingPriceData, getPriceDataErrorMsg, defineReqParamsForPriceData] = useGetPricesOverTime();

  return <PriceDataCtx.Provider value={{ priceData: priceData, loadingPriceData: loadingPriceData, getPriceDataErrorMsg: getPriceDataErrorMsg, defineReqParamsForPriceData: defineReqParamsForPriceData }}>{children}</PriceDataCtx.Provider>;
};

PriceDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
