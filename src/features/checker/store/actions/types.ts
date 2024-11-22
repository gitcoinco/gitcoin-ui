import { Hex } from "viem";

import { CheckerApiEvaluationQuestion } from "~checker/services/checker";

import { CheckerApplication } from "../types";

export interface SetInitialStateAction {
  type: "SET_INITIAL_STATE";
  payload: {
    address: Hex;
    poolId: string;
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

export interface SetPoolDataAction {
  type: "SET_POOL_DATA";
  payload: {
    poolId: string;
    chainId: number;
    applications: Record<string, CheckerApplication>;
    evaluationQuestions: CheckerApiEvaluationQuestion[];
    lastFetchedAt: Date;
    isLoading?: boolean;
    isFetching?: boolean;
    isError?: boolean;
    error: Error | null;
  };
}

export type CheckerAction =
  | SetInitialStateAction
  | SetPoolDataAction
  | GoToReviewApplicationsAction
  | GoToApplicationEvaluationOverviewAction
  | GoToApplicationEvaluationAction
  | GoToSubmitFinalEvaluationAction;
