// types.ts
export enum ProgressStatus {
  IS_SUCCESS = "IS_SUCCESS",
  IN_PROGRESS = "IN_PROGRESS",
  IS_ERROR = "IS_ERROR",
  NOT_STARTED = "NOT_STARTED",
}

export interface Step {
  name: string;
  description: string;
  status: ProgressStatus;
}

export interface ProgressModalProps {
  steps: Step[];
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  heading?: string;
  subheading?: string;
}