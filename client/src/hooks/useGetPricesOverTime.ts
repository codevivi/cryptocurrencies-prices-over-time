import { useCallback, useEffect, useState } from "react";
import { SERVER_BASE_URL } from "../config";
import axios from "axios";
const url = SERVER_BASE_URL + "api/price-data";

type ChartData = [number, number, number, number, number, number][] | [];

type PairSymbol = string;

export type CustomizedPriceData =
  | {
      date: Date;
      dateString: string;
      price: number;
      group: PairSymbol;
    }[]
  | null;

export type IsLoading = boolean;
export type GetPricesErrorMsg = string;
export type SetReqQuery = (currency: string, timeframe: string, limit: number) => void;
export type ClearGetPricesErrorMsg = () => void;

type UseGetPricesOverTime = () => [CustomizedPriceData | null, IsLoading, GetPricesErrorMsg, ClearGetPricesErrorMsg, SetReqQuery];

const customizeData = (data: ChartData, symbol: PairSymbol): CustomizedPriceData => {
  let customData = data.map((item) => {
    let date = new Date(item[0]);
    let dateString = date.toLocaleString();
    return { date: date, dateString: dateString, price: item[1], group: symbol };
  });
  return customData;
};

export const useGetPricesOverTime: UseGetPricesOverTime = () => {
  const [reqQuery, setReqQuery] = useState<string | null>(null);
  const [priceData, setPriceData] = useState<CustomizedPriceData>(null);
  const [getPricesErrorMsg, setGetPricesErrorMsg] = useState<GetPricesErrorMsg>("");
  const [loading, setLoading] = useState<IsLoading>(false);

  const setReqQueryCallback: SetReqQuery = useCallback((currency, timeframe, limit) => {
    setReqQuery(`?currency=${currency}&timeframe=${timeframe}&limit=${limit}`);
  }, []);

  const clearGetPricesErrorMsg: ClearGetPricesErrorMsg = useCallback(() => {
    setGetPricesErrorMsg("");
  }, []);

  useEffect(() => {
    if (reqQuery === null) {
      return;
    }
    setGetPricesErrorMsg("");
    setLoading(true);
  }, [reqQuery]);

  useEffect(() => {
    if (reqQuery === null) {
      return;
    }
    axios
      .get(`${url}${reqQuery}`)
      .then((res) => {
        if (res.status === 200) {
          let customizedData = customizeData(res.data.data.chartData, res.data.data.symbol);
          if (customizedData?.length === 0) {
            setGetPricesErrorMsg("No data for your selection");
          }
          setPriceData(customizedData || null);
        }
      })
      .catch((e) => {
        setGetPricesErrorMsg(e.response?.data.message || "Sorry, problems communicating with server");
        setPriceData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [reqQuery]);

  return [priceData, loading, getPricesErrorMsg, clearGetPricesErrorMsg, setReqQueryCallback];
};
