import { useEffect, useState } from "react";
import { SERVER_BASE_URL } from "../config.js";
import axios from "axios";
const url = SERVER_BASE_URL + "api/timeframes";

export type Timeframes = { value: string; text: string }[] | null;
type isError = boolean;

export const useGetTimeframes = (): [Timeframes, isError] => {
  const [timeframes, setTimeframes] = useState(null);
  const [isGetTimeframesError, setIsGetTimeframesError] = useState<isError>(false);
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        if (res.status === 200) {
          setTimeframes(res.data.data);
        }
      })
      .catch((e) => {
        setIsGetTimeframesError(true);
      });
  }, []);
  return [timeframes, isGetTimeframesError];
};
