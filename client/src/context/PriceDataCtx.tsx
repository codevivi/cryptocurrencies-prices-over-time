import { createContext } from "react";
import PropTypes from "prop-types";
import useGetPricesOverTime from "../hooks/useGetPricesOverTime";
import { ReactNode } from "react";
export const PriceDataCtx = createContext(null);

export const PriceDataProvider = ({ children }: { children: ReactNode }) => {
  const [priceData, loadingPriceData, getPricesErrorMsg, clearGetPricesErrorMsg, setReqQueryCallback] = useGetPricesOverTime();

  return <PriceDataCtx.Provider value={{ priceData: priceData, loadingPriceData: loadingPriceData, getPricesErrorMsg: getPricesErrorMsg, clearGetPricesErrorMsg: clearGetPricesErrorMsg, setReqQueryCallback: setReqQueryCallback }}>{children}</PriceDataCtx.Provider>;
};

PriceDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
