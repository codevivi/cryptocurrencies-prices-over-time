import { useCallback, useEffect, useState } from "react";
import { SERVER_BASE_URL } from "../config";
import axios from "axios";
const url = SERVER_BASE_URL + "api/price-data";

const customizeData = (data, symbol) => {
  let customData = data.map((item) => {
    let date = new Date(item[0]);
    let dateString = date.toLocaleString();
    return { date: date, dateString: dateString, price: item[1], group: symbol };
  });
  return customData;
};

function useGetPricesOverTime() {
  const [reqParams, setReqParams] = useState(null);
  const [priceData, setPriceData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const defineReqParamsForPriceData = useCallback((currency, timeframe, limit, searchType) => {
    setReqParams({ currency: currency, timeframe: timeframe, limit: limit, searchType: searchType });
  }, []);

  useEffect(() => {
    if (reqParams === null) {
      return;
    }
    setErrorMsg("");
    setLoading(true);
  }, [reqParams]);

  useEffect(() => {
    if (reqParams === null) {
      return;
    }
    axios
      .get(url + `?currency=${reqParams.currency}&timeframe=${reqParams.timeframe}&limit=${reqParams.limit}&searchType=${reqParams.searchType}`)
      .then((res) => {
        if (res.status === 200) {
          let customizedData = customizeData(res.data.data.chartData, res.data.data.symbol);
          if (customizedData.length === 0) {
            setErrorMsg("No data for your selection");
          }
          setPriceData(customizedData);
          setLoading(false);
        }
      })
      .catch((e) => {
        setErrorMsg(e.response?.data.message || "Sorry, problems communicating with server");
      });
  }, [reqParams]);

  return [priceData, loading, errorMsg, defineReqParamsForPriceData];
}
export default useGetPricesOverTime;
