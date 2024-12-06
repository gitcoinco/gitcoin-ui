import { generatePoolUUID } from "~checker/utils/generatePoolUUID";

import { CheckerAction } from "./actions";
import { CheckerContextRoute, CheckerContextType, CheckerRoute } from "./types";

export const checkerReducer = (
  state: CheckerContextType,
  action: CheckerAction,
): CheckerContextType => {
  switch (action.type) {
    case "SET_INITIAL_STATE":
      return { ...state, ...action.payload };
    case "GO_TO_REVIEW_APPLICATIONS": {
      const newRoute: CheckerContextRoute = { id: CheckerRoute.ReviewApplications };
      window.history.pushState(
        {
          route: newRoute,
          from: "internal",
        },
        "",
      );
      return { ...state, route: newRoute };
    }
    case "GO_TO_APPLICATION_EVALUATION_OVERVIEW": {
      const newRoute: CheckerContextRoute = {
        id: CheckerRoute.ApplicationEvaluationOverview,
        projectId: action.payload.projectId,
      };
      window.history.pushState(
        {
          route: newRoute,
          from: "internal",
        },
        "",
      );
      return { ...state, route: newRoute };
    }
    case "GO_TO_SUBMIT_APPLICATION_EVALUATION": {
      const newRoute: CheckerContextRoute = {
        id: CheckerRoute.SubmitApplicationEvaluation,
        projectId: action.payload.projectId,
      };
      window.history.pushState(
        {
          route: newRoute,
          from: "internal",
        },
        "",
      );
      return { ...state, route: newRoute };
    }
    case "GO_TO_SUBMIT_FINAL_EVALUATION": {
      const newRoute: CheckerContextRoute = { id: CheckerRoute.SubmitFinalEvaluation };
      window.history.pushState(
        {
          route: newRoute,
          from: "internal",
        },
        "",
      );
      return { ...state, route: newRoute };
    }
    case "SET_ROUTE_HISTORY": {
      const { route, replace = false } = action.payload;
      if (replace) {
        window.history.replaceState(
          {
            route,
            from: "internal",
          },
          "",
        );
      }
      return { ...state, route };
    }
    case "SET_POOL_DATA": {
      const { poolId, chainId } = action.payload;
      const poolUUID = generatePoolUUID(poolId, chainId);
      if (!poolUUID) return state;

      return {
        ...state,
        poolsData: { ...state.poolsData, [poolUUID]: { ...action.payload } },
      };
    }
    default:
      return state;
  }
};
