import { useEffect, useState } from "react";
import { SERVER_BASE_URL } from "../config";
import axios from "axios";
const url = SERVER_BASE_URL + "api/timeframes";

function useGetTimeframes() {
  const [timeframes, setTimeframes] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        if (res.status === 200) {
          setTimeframes(res.data.data);
        }
      })
      .catch((e) => {
        setErrorMsg(e.response?.message || "Sorry, problems communicating with server");
      });
  }, []);
  return [timeframes, errorMsg];
}
export default useGetTimeframes;
