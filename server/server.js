import { PORT, CLIENT } from "./config.js";
import express from "express";
import cors from "cors";
import serverInfo from "./src/requestsControl/serverInfo.js";
import getCurrencies from "./src/requestsControl/getCurrencies.js";
import getPriceData from "./src/requestsControl/getPriceData.js";
import getTimeframes from "./src/requestsControl/getTimeframes.js";
import awaitErrorCatcher from "./src/utils/awaitErrorCatcher.js";
import validatePriceDataQuery from "./src/middlewares/validatePriceDataQuery.js";
import errorOnWrongEndPoint from "./src/middlewares/errorOnWrongEndPoint.js";
import errorResponder from "./src/middlewares/errorResponder.js";
import saveUserAction from "./src/requestsControl/saveUserAction.js";

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
