import { PORT, CLIENT } from "./config.js";
import express from "express";
import cors from "cors";
import serverInfo from "./src/requestsControl/serverInfo.js";
import getCurrencies from "./src/requestsControl/getCurrencies.js";
import getPriceData from "./src/requestsControl/getPriceData.js";
import getTimeframes from "./src/requestsControl/getTimeframes.js";
import awaitErrorCatcher from "./src/utils/awaitErrorCatcher.js";
import logUserActions from "./src/middlewares/logUserActions.js";
import validatePriceDataQuery from "./src/middlewares/validatePriceDataQuery.js";
import errorOnWrongEndPoint from "./src/middlewares/errorOnWrongEndPoint.js";
import errorResponder from "./src/middlewares/errorResponder.js";
import { database } from "./src/db.js";

const app = express();

app.use(cors({ origin: CLIENT, credentials: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", serverInfo);
app.get("/api/currencies", awaitErrorCatcher(getCurrencies));
app.get("/api/timeframes", awaitErrorCatcher(getTimeframes));
app.get("/api/price-data", [awaitErrorCatcher(validatePriceDataQuery), logUserActions, awaitErrorCatcher(getPriceData)]);

app.use(errorOnWrongEndPoint);
app.use(errorResponder);

app.listen(PORT, () => {
  console.log(`Sever is running on port ${PORT}`);
});
