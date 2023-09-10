import { useReducer, useEffect } from "react";
import { SERVER_BASE_URL } from "../config";
import axios from "axios";
const url = SERVER_BASE_URL + "save-user-action";
const actionsToLog = ["selected cryptocurrency", "searched cryptocurrency"];

function actionToLogReducer(state, action) {
  if (state === null) {
    state = { description: "", value: "" };
  }
  if (state.description === action.description && state.value === action.value) {
    return state;
  }
  if (!actionsToLog.includes(action.description)) {
    throw new Error(`Invalid description, please provide one of: ${actionsToLog.join(", ")}`);
  }
  return {
    description: action.description,
    value: action.value || "",
  };
}

function useLogUserAction() {
  const [actionToLog, dispatchActionToLog] = useReducer(actionToLogReducer, null);

  useEffect(() => {
    if (actionToLog === null) {
      return;
    }
    axios
      .post(url, actionToLog)
      .then((res) => {
        //not sure what to do with response if not needed
        if (res.status !== 200) {
          throw new Error();
        }
      })
      .catch((e) => {
        console.log(e.response?.message || "Server unable to log or save user action");
      });
  }, [actionToLog]);

  return [dispatchActionToLog];
}
export default useLogUserAction;
