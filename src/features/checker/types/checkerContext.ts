import { Hex } from "viem";

import { ProjectApplicationForManager } from ".";

export enum CheckerRoute {
  ReviewApplications = "review-applications",
  ApplicationEvaluationOverview = "application-evaluation-overview",
  ApplicationEvaluation = "application-evaluation",
  SubmitFinalEvaluation = "submit-final-evaluation",
}

export interface CheckerContextType {
  applications: ProjectApplicationForManager[];
  roundId?: string;
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
