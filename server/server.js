import express from "express";
import cors from "cors";
import awaitErrorCatcher from "./src/utils/awaitErrorCatcher.js";
import { PORT, CLIENT } from "./config.js";
import serverInfo from "./src/requestsControl/serverInfo.js";
import { getCurrencies } from "./src/requestsControl/getCurrencies.js";
import errorOnWrongEndPoint from "./src/middlewares/errorOnWrongEndPoint.js";
import errorResponder from "./src/middlewares/errorResponder.js";

const app = express();

app.use(cors({ origin: CLIENT, credentials: false }));
app.use(express.json());

app.get("/", serverInfo);
app.get("/api/currencies", awaitErrorCatcher(getCurrencies));

app.use(errorOnWrongEndPoint);
app.use(errorResponder);

app.listen(PORT, () => {
  console.log(`Sever is running on port ${PORT}`);
});
