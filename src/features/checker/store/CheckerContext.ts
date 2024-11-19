import { createContext } from "react";

import { CheckerAction, CheckerContextType } from "../types";

export const initialState: CheckerContextType = {
  applications: [],
};

export const CheckerContext = createContext<CheckerContextType>(initialState);
export const CheckerDispatchContext = createContext<React.Dispatch<CheckerAction> | null>(null);
