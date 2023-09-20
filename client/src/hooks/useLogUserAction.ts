import { useReducer, useEffect } from "react";
import { SERVER_BASE_URL } from "../config";
import axios from "axios";
const url = SERVER_BASE_URL + "save-user-action";

export enum ActionToLogDescription {
  SELECTED_CRYPTOCURRENCY = "selected cryptocurrency",
  SEARCHED_CRYPTOCURRENCY = "searched cryptocurrency",
}

export type ActionToLogAction = {
  description: ActionToLogDescription;
  value?: string;
};

type ActionToLogState = {
  description: ActionToLogDescription | "";
  value: string;
} | null;

function actionToLogReducer(state: ActionToLogState, action: ActionToLogAction): ActionToLogState {
  if (state === null) {
    state = { description: "", value: "" };
  }
  if (state.description === action.description && state.value === action.value) {
    return state;
  }
  return {
    description: action.description,
    value: action.value || "",
  };
}

export const useLogUserAction = () => {
  //using useReducer to make sure state not updated if identical object passed
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
};
export default useLogUserAction;
