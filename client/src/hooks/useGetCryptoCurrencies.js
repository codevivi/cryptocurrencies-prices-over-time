import { useEffect, useState } from "react";
import { SERVER_BASE_URL } from "../config";
import axios from "axios";
const url = SERVER_BASE_URL + "api/currencies";

function useGetCryptoCurrencies() {
  const [cryptoCurrencies, setCryptocurrencies] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    axios
      .get(url, { headers: { "content-Type": "application/json", Accept: "application/json" } })
      .then((res) => {
        if (res.status === 200) {
          setCryptocurrencies(res.data.data);
        }
      })
      .catch((e) => {
        setErrorMsg(e.response?.message || "Sorry, problems communicating with server");
      });
  }, []);
  return [cryptoCurrencies, errorMsg];
}
export default useGetCryptoCurrencies;
