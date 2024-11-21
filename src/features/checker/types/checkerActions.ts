import { Hex } from "viem";

import { ProjectApplicationForManager } from ".";

export interface SetInitialStateAction {
  type: "SET_INITIAL_STATE";
  payload: {
    address: Hex;
    roundId: string;
    chainId: number;
  };
}

export interface GoToReviewApplicationsAction {
  type: "GO_TO_REVIEW_APPLICATIONS";
}

export interface GoToApplicationEvaluationOverviewAction {
  type: "GO_TO_APPLICATION_EVALUATION_OVERVIEW";
  payload: {
    projectId: string;
  };
}

export interface GoToApplicationEvaluationAction {
  type: "GO_TO_APPLICATION_EVALUATION";
  payload: {
    projectId: string;
  };
}

export interface GoToSubmitFinalEvaluationAction {
  type: "GO_TO_SUBMIT_FINAL_EVALUATION";
}

export interface SetApplicationsAction {
  type: "SET_APPLICATIONS";
  payload: ProjectApplicationForManager[];
}

export type CheckerAction =
  | SetInitialStateAction
  | SetApplicationsAction
  | GoToReviewApplicationsAction
  | GoToApplicationEvaluationOverviewAction
  | GoToApplicationEvaluationAction
  | GoToSubmitFinalEvaluationAction;
