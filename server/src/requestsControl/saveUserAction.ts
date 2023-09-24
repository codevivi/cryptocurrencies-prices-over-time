import CustomError from "../utils/CustomError.js";
import consoleLogUserActions from "../utils/consoleLogUserActions.js";
import UserActionModel from "../models/userActionModel.js";
import { isDatabase } from "../db.js";
import { StatusCode } from "status-code-enum";
import { AsyncRequestHandler } from "../utils/types.js";

const saveUserAction: AsyncRequestHandler = async (req, res, next) => {
  const { description, value } = req.body;
  if (!description) {
    throw new CustomError(StatusCode.ClientErrorBadRequest, "Missing description to save user action");
  }
  consoleLogUserActions(description, value);
  if (isDatabase) {
    const action = { value: "", description: "" };
    action.description = description;
    if (value) {
      action.value = value;
    }
    try {
      const dataToSave = new UserActionModel(action);
      const saved = await dataToSave.save();
    } catch (e) {
      throw new CustomError(StatusCode.ServerErrorInternal, "Unable to save user action to db");
    }
  }
  res.status(200).json({ type: "success", message: "User action saved" });
};
export default saveUserAction;
