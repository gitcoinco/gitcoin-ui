import { CheckerAction, CheckerContextType, CheckerRoute } from "../types";

export const checkerReducer = (
  state: CheckerContextType,
  action: CheckerAction,
): CheckerContextType => {
  switch (action.type) {
    case "SET_INITIAL_STATE":
      return { ...state, ...action.payload };
    case "GO_TO_REVIEW_APPLICATIONS":
      return { ...state, route: { id: CheckerRoute.ReviewApplications } };
    case "GO_TO_APPLICATION_EVALUATION_OVERVIEW":
      return {
        ...state,
        route: {
          id: CheckerRoute.ApplicationEvaluationOverview,
          projectId: action.payload.projectId,
        },
      };
    case "GO_TO_APPLICATION_EVALUATION":
      return {
        ...state,
        route: { id: CheckerRoute.ApplicationEvaluation, projectId: action.payload.projectId },
      };
    case "SET_APPLICATIONS":
      return { ...state, applications: action.payload };
    default:
      return state;
  }
};
