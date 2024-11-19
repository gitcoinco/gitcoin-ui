import { CheckerAction, CheckerContextType } from "../types";

export const checkerReducer = (
  state: CheckerContextType,
  action: CheckerAction,
): CheckerContextType => {
  switch (action.type) {
    case "SET_APPLICATIONS":
      return { ...state, applications: action.payload };
    default:
      return state;
  }
};
