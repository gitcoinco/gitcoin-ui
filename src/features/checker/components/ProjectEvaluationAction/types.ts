export type ProjectStatus = "pending" | "approved" | "rejected";

export type EvaluationAction = "approve" | "reject" | "skip";
export interface ProjectEvaluationActionProps {
  onEvaluate: (projectId: string, action: EvaluationAction) => void;
  projectId: string;
  status: ProjectStatus;
}
