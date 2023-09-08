const chartOptions = {
  title: "Prices over time",
  theme: "g90",
  axes: {
    bottom: {
      title: "Date",
      mapsTo: "date",
      scaleType: "time",
      //   mapsTo: "dateString",
      //   scaleType: "labels",
      //could use scale type labels,maps to dateString to show precise time,but need to control limit, as gets too crowded.
    },
    left: {
      mapsTo: "price",
      title: "Price USDT",
      scaleType: "log",
    },
    curve: "curveMonotoneX",
    height: "400px",
  },
  tooltip: {
    formatter: (val) => {
      return val + "bla";
    },
  },
};

function getChartOptions(priceData) {
  if (priceData === null || priceData.length === 0) {
    return chartOptions;
  }

  const customOptions = { ...chartOptions };
  if (priceData[0].price < 1) {
    customOptions.axes.left.scaleType = "linear";
  }

  return customOptions;
}

export default getChartOptions;
