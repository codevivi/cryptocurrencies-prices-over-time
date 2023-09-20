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
  const [reqQuery, setReqQuery] = useState(null);
  const [priceData, setPriceData] = useState(null);
  const [getPricesErrorMsg, setGetPricesErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const setReqQueryCallback = useCallback((currency, timeframe, limit) => {
    setReqQuery(`?currency=${currency}&timeframe=${timeframe}&limit=${limit}`);
  }, []);

  const clearGetPricesErrorMsg = useCallback(() => {
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
          if (customizedData.length === 0) {
            setGetPricesErrorMsg("No data for your selection");
          }
          setPriceData(customizedData);
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
}
export default useGetPricesOverTime;
