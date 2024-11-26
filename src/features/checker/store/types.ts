import { Hex } from "viem";

import { ProjectApplicationForManager } from "~checker/services/allo";
import { CheckerApiApplication, CheckerApiEvaluationQuestion } from "~checker/services/checker";

export interface CheckerApplication extends ProjectApplicationForManager, CheckerApiApplication {
  lastFetchedAt?: Date;
}

export interface CheckerPoolData {
  chainId: number;
  poolId: string;
  applications: Record<string, CheckerApplication>;
  evaluationQuestions: CheckerApiEvaluationQuestion[];
  lastFetchedAt: Date;
  isLoading?: boolean;
  isFetching?: boolean;
  isError?: boolean;
  error: Error | null;
}

export enum CheckerRoute {
  ReviewApplications = "review-applications",
  ApplicationEvaluationOverview = "application-evaluation-overview",
  SubmitApplicationEvaluation = "submit-application-evaluation",
  SubmitFinalEvaluation = "submit-final-evaluation",
  ApplicationEvaluation = "application-evaluation",
}

export interface CheckerContextType {
  poolsData: Record<string, CheckerPoolData>;
  poolId?: string;
  chainId?: number;
  address?: Hex;
  route:
    | { id: CheckerRoute.SubmitFinalEvaluation }
    | { id: CheckerRoute.ReviewApplications }
    | {
        id: CheckerRoute.ApplicationEvaluationOverview | CheckerRoute.SubmitApplicationEvaluation;
        projectId: string;
      }
    | {
        id: CheckerRoute.ApplicationEvaluation;
        projectId: string;
      };
}
