import { useContext } from "react";
import "@carbon/charts-react/styles.css";
import { LineChart } from "@carbon/charts-react";
import { Loading } from "@carbon/react";
import { PriceDataCtx } from "../../context/PriceDataCtx";
import getChartOptions from "./chartOptions";

function ChartContent() {
  const { priceData, loadingPriceData, getPriceDataErrorMsg } = useContext(PriceDataCtx);
  if (getPriceDataErrorMsg) {
    return (
      <div className="chart empty">
        <p className="error-msg">{getPriceDataErrorMsg}</p>
      </div>
    );
  }
  if (priceData === null) {
    return <div className="chart empty"></div>;
  }

  return <div className="chart">{loadingPriceData ? <Loading withOverlay={false} /> : <LineChart data={priceData} options={getChartOptions(priceData)}></LineChart>}</div>;
}
export default ChartContent;
