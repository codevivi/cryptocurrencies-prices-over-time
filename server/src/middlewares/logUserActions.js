import consoleLogUserActions from "../utils/consoleLogUserActions.js";

const logUserActions = (req, res, next) => {
  if (req.query.currency && req.query.searchType) {
    consoleLogUserActions(req.query.currency, req.query.searchType);
  }
  next();
};

export default logUserActions;
