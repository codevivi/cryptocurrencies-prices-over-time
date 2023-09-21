import getPreloadedDefaultExchange from "../externalApis/defaultExchange.js";

async function getTimeframes(req, res, next) {
  const ex = await getPreloadedDefaultExchange();
  const timeframes = ex.timeframes;
  let timeframesArr = [];
  for (let key in timeframes) {
    timeframesArr.push({ value: key, text: timeframes[key] });
  }
  res.status(200).json({ type: "success", message: "Timeframes", data: timeframesArr });
}

export default getTimeframes;
