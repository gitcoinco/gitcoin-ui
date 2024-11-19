import { createContext } from "react";

import { CheckerAction, CheckerContextType, CheckerRoute } from "../types";

export const initialState: CheckerContextType = {
  applications: [],
  route: { id: CheckerRoute.ReviewApplications },
};

export const CheckerContext = createContext<CheckerContextType>(initialState);
export const CheckerDispatchContext = createContext<React.Dispatch<CheckerAction> | null>(null);
