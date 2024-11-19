import { ProjectApplicationForManager } from "./projectApplication";

export interface CheckerContextType {
  applications: ProjectApplicationForManager[];
  roundId?: string;
  chainId?: number;
}
