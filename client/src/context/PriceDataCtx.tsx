import { createContext } from "react";
import PropTypes from "prop-types";
import { ReactNode } from "react";
import { useGetPricesOverTime } from "../hooks/useGetPricesOverTime";
import { type CustomizedPriceData, type IsLoading, type GetPricesErrorMsg, type ClearGetPricesErrorMsg, type SetReqQuery } from "../hooks/useGetPricesOverTime";

export type PriceDataContextValue = {
  priceData: CustomizedPriceData;
  loadingPriceData: IsLoading;
  getPricesErrorMsg: GetPricesErrorMsg;
  clearGetPricesErrorMsg: ClearGetPricesErrorMsg;
  setReqQueryCallback: SetReqQuery;
};

export const PriceDataCtx = createContext<PriceDataContextValue | null>(null);

export const PriceDataProvider = ({ children }: { children: ReactNode }) => {
  const [priceData, loadingPriceData, getPricesErrorMsg, clearGetPricesErrorMsg, setReqQueryCallback] = useGetPricesOverTime();

  return <PriceDataCtx.Provider value={{ priceData: priceData, loadingPriceData: loadingPriceData, getPricesErrorMsg: getPricesErrorMsg, clearGetPricesErrorMsg: clearGetPricesErrorMsg, setReqQueryCallback: setReqQueryCallback }}>{children}</PriceDataCtx.Provider>;
};

PriceDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
