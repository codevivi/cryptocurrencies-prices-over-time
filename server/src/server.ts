import { PORT, CLIENT } from "./config.js";
import express from "express";
import cors from "cors";
import serverInfo from "./requestsControl/serverInfo.js";
import getCurrencies from "./requestsControl/getCurrencies.js";
import getPriceData from "./requestsControl/getPriceData.js";
import getTimeframes from "./requestsControl/getTimeframes.js";
import awaitErrorCatcher from "./utils/awaitErrorCatcher.js";
import validatePriceDataQuery from "./middlewares/validatePriceDataQuery.js";
import errorOnWrongEndPoint from "./middlewares/errorOnWrongEndPoint.js";
import errorResponder from "./middlewares/errorResponder.js";
import saveUserAction from "./requestsControl/saveUserAction.js";

const app = express();

app.use(cors({ origin: CLIENT, credentials: false }));
app.use(express.json());

app.get("/", serverInfo);
app.post("/save-user-action", awaitErrorCatcher(saveUserAction));

app.get("/api/currencies", awaitErrorCatcher(getCurrencies));
app.get("/api/timeframes", awaitErrorCatcher(getTimeframes));
app.get("/api/price-data", [awaitErrorCatcher(validatePriceDataQuery), awaitErrorCatcher(getPriceData)]);

app.use(errorOnWrongEndPoint);
app.use(errorResponder);

app.listen(PORT, () => {
  console.log(`Sever is running on port ${PORT}`);
});
