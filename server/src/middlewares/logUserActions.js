import consoleLogUserActions from "../utils/consoleLogUserActions.js";
import UserActionModel from "../models/userActionModel.js";
import { isDatabase } from "../db.js";
import { NODE_ENV } from "../../config.js";

const logUserActions = async (req, res, next) => {
  if (req.query.currency && req.query.searchType) {
    consoleLogUserActions(req.query.currency, req.query.searchType);
    if (!isDatabase) {
      return next();
    }
    const dataToSave = new UserActionModel({
      currency: req.query.currency,
      searchType: req.query.searchType,
    });

    try {
      const saved = await dataToSave.save();
    } catch (e) {
      NODE_ENV === "development" && console.log(e);
    }
  }
  next();
};

export default logUserActions;
