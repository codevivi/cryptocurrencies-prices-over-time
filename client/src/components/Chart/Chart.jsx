import { useContext, useEffect, useRef } from "react";
import ChartContent from "./ChartContent";
import { PriceDataCtx } from "../../context/PriceDataCtx";

const Chart = () => {
  const { loadingPriceData } = useContext(PriceDataCtx);
  const chartRef = useRef();
  useEffect(() => {
    if (loadingPriceData) {
      return;
    }
    if (chartRef.current) {
      chartRef.current.scrollIntoView();
    }
  }, [loadingPriceData]);
  return (
    <div className="chart-container" ref={chartRef}>
      <ChartContent />
    </div>
  );
};
export default Chart;
