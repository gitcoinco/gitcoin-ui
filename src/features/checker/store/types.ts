import { Hex } from "viem";

import { ProjectApplicationForManager } from "../services/allo";
import { CheckerApiApplication, CheckerApiEvaluationQuestion } from "../services/checker";

interface CheckerApplication extends ProjectApplicationForManager, CheckerApiApplication {
  lastFetchedAt?: Date;
}

interface CheckerPoolData {
  applications: CheckerApplication[];
  evaluationQuestions: CheckerApiEvaluationQuestion[];
  lastFetchedAt: Date;
}

export enum CheckerRoute {
  ReviewApplications = "review-applications",
  ApplicationEvaluationOverview = "application-evaluation-overview",
  ApplicationEvaluation = "application-evaluation",
  SubmitFinalEvaluation = "submit-final-evaluation",
}

export interface CheckerContextType {
  poolData: Record<string, CheckerPoolData>;
  poolId?: string;
  chainId?: number;
  address?: Hex;
  route:
    | { id: CheckerRoute.SubmitFinalEvaluation }
    | { id: CheckerRoute.ReviewApplications }
    | {
        id: CheckerRoute.ApplicationEvaluationOverview | CheckerRoute.ApplicationEvaluation;
        projectId: string;
      };
}
