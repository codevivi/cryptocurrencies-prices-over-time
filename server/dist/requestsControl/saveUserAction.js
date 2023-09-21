import CustomError from "../utils/CustomError.js";
import consoleLogUserActions from "../utils/consoleLogUserActions.js";
import UserActionModel from "../models/userActionModel.js";
import { isDatabase } from "../db.js";
async function saveUserAction(req, res, next) {
    const { description, value } = req.body;
    if (!description) {
        throw new CustomError(400, "failure", "Missing description to save user action");
    }
    consoleLogUserActions(description, value);
    if (isDatabase) {
        const action = {};
        action.description = description;
        if (value) {
            action.value = value;
        }
        try {
            const dataToSave = new UserActionModel(action);
            const saved = await dataToSave.save();
        }
        catch (e) {
            throw new CustomError(500, "error", "Unable to save user action to db");
        }
    }
    res.status(200).json({ type: "success", message: "User action saved" });
}
export default saveUserAction;
