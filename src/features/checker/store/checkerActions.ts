import {
  GoToApplicationEvaluationAction,
  GoToApplicationEvaluationOverviewAction,
  GoToReviewApplicationsAction,
  GoToSubmitFinalEvaluationAction,
  SetApplicationsAction,
  SetInitialStateAction,
} from "../types";

export const setInitialStateAction = (
  payload: SetInitialStateAction["payload"],
): SetInitialStateAction => ({
  type: "SET_INITIAL_STATE",
  payload,
});

export const goToReviewApplicationsAction = (): GoToReviewApplicationsAction => ({
  type: "GO_TO_REVIEW_APPLICATIONS",
});

export const goToApplicationEvaluationOverviewAction = (
  payload: GoToApplicationEvaluationOverviewAction["payload"],
): GoToApplicationEvaluationOverviewAction => ({
  type: "GO_TO_APPLICATION_EVALUATION_OVERVIEW",
  payload,
});

export const goToApplicationEvaluationAction = (
  payload: GoToApplicationEvaluationAction["payload"],
): GoToApplicationEvaluationAction => ({
  type: "GO_TO_APPLICATION_EVALUATION",
  payload,
});

export const goToSubmitFinalEvaluationAction = (): GoToSubmitFinalEvaluationAction => ({
  type: "GO_TO_SUBMIT_FINAL_EVALUATION",
});

export const setApplicationsAction = (
  payload: SetApplicationsAction["payload"],
): SetApplicationsAction => ({
  type: "SET_APPLICATIONS",
  payload,
});
