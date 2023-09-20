import { useEffect, useState } from "react";
import { SERVER_BASE_URL } from "../config.js";
import axios from "axios";
const url = SERVER_BASE_URL + "api/currencies";

type CryptoCurrency = {
  id: string;
  code: string;
  name: string;
  displayName: string;
};
export type CryptoCurrencies = CryptoCurrency[] | null;
type isError = boolean;

export const useGetCryptoCurrencies = (): [CryptoCurrencies, isError] => {
  const [cryptoCurrencies, setCryptocurrencies] = useState<CryptoCurrencies>(null);
  const [isGetCryptoCurrenciesError, setIsGetCryptoCurrenciesError] = useState<isError>(false);
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        if (res.status === 200) {
          setCryptocurrencies(res.data.data);
        }
      })
      .catch((e) => {
        setIsGetCryptoCurrenciesError(true);
      });
  }, []);
  return [cryptoCurrencies, isGetCryptoCurrenciesError];
};
