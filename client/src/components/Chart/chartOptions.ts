import { type CustomizedPriceData } from "../../hooks/useGetPricesOverTime";
import { LineChartOptions } from "@carbon/charts";
import { ChartTheme, ScaleTypes } from "@carbon/charts";
const chartOptions: LineChartOptions = {
  title: "Prices over time",
  theme: ChartTheme.G90,
  axes: {
    bottom: {
      title: "Date",
      mapsTo: "date",
      scaleType: ScaleTypes.TIME,
      //   mapsTo: "dateString",
      //   scaleType: "labels",
      //could use scale type labels,maps to dateString to show precise time,but need to control limit, as gets too crowded.
    },
    left: {
      mapsTo: "price",
      title: "Price USDT",
      scaleType: ScaleTypes.LOG,
    },
  },
  curve: "curveMonotoneX",
  height: "400px",
};

function getChartOptions(priceData: CustomizedPriceData) {
  if (priceData === null || priceData.length === 0) {
    return chartOptions;
  }
  const customOptions = { ...chartOptions };
  if (priceData[0].price < 1) {
    if (customOptions.axes && customOptions.axes.left) {
      customOptions.axes.left.scaleType = ScaleTypes.LINEAR;
    }
  }
  return customOptions;
}

export default getChartOptions;
