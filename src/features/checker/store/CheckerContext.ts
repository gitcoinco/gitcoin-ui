import { createContext } from "react";

import { CheckerAction } from "./actions";
import { CheckerContextType, CheckerRoute } from "./types";

export const initialState: CheckerContextType = {
  poolData: {},
  route: { id: CheckerRoute.ReviewApplications },
};

export const CheckerContext = createContext<CheckerContextType>(initialState);
export const CheckerDispatchContext = createContext<React.Dispatch<CheckerAction> | null>(null);
