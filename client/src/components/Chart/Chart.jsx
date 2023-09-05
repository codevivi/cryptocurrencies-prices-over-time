import { useContext } from "react";
import "@carbon/charts-react/styles.css";
import { LineChart } from "@carbon/charts-react";
import { Loading } from "@carbon/react";
import { PriceDataCtx } from "../../context/PriceDataCtx";
import getChartOptions from "./chartOptions";

const Chart = () => {
  const { priceData, loadingPriceData, getPriceDataErrorMsg } = useContext(PriceDataCtx);

  if (getPriceDataErrorMsg) {
    return <p className="error-msg">{getPriceDataErrorMsg}</p>;
  }
  if (priceData === null) {
    return null;
  }

  return <div className="chart">{loadingPriceData ? <Loading withOverlay={false} /> : <LineChart data={priceData} options={getChartOptions(priceData)}></LineChart>}</div>;
};
export default Chart;
