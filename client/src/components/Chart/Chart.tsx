import { useContext, useEffect, useRef } from "react";
import { LineChart } from "@carbon/charts-react";
import { PriceDataCtx } from "../../context/PriceDataCtx";
import getChartOptions from "./chartOptions";
import "@carbon/charts/styles.css";

const Chart = () => {
  const { loadingPriceData, priceData, getPricesErrorMsg } = useContext(PriceDataCtx);
  const chartRef = useRef();

  useEffect(() => {
    if (loadingPriceData || priceData === null) {
      return;
    }
    if (chartRef.current) {
      chartRef.current.scrollIntoView();
    }
  }, [loadingPriceData, priceData]);

  return (
    <>
      <div className="chart-container" tabIndex={-1} ref={chartRef}>
        <div className="chart">
          {getPricesErrorMsg && <p className="error-msg">{getPricesErrorMsg}</p>}
          <LineChart data={priceData === null ? [] : priceData} options={getChartOptions(priceData)}></LineChart>
        </div>
      </div>
    </>
  );
};
export default Chart;
