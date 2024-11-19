import { ProjectApplicationForManager } from "./projectApplication";

export enum CheckerRoute {
  ReviewApplications = "review-applications",
  ApplicationEvaluationOverview = "application-evaluation-overview",
  ApplicationEvaluation = "application-evaluation",
}

export interface CheckerContextType {
  applications: ProjectApplicationForManager[];
  roundId?: string;
  chainId?: number;
  address?: string;
  route:
    | { id: CheckerRoute.ReviewApplications }
    | {
        id: CheckerRoute.ApplicationEvaluationOverview | CheckerRoute.ApplicationEvaluation;
        projectId: string;
      };
}
