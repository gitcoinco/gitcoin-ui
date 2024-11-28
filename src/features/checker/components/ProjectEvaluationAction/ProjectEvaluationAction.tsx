import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/primitives/Button";
import { IconType, Icon } from "@/primitives/Icon";

import { EvaluationAction, ProjectStatus } from "~checker/types";

import { getButtonProps, evaluateProject } from "./utils";

const baseButtonStyles = "font-mona flex gap-2 rounded-lg px-4 py-2";

export interface ProjectEvaluationActionProps {
  onEvaluate: (projectId: string, action: EvaluationAction) => void;
  projectId: string;
  status: ProjectStatus;
}

export const ProjectEvaluationAction = ({
  onEvaluate,
  projectId,
  status,
}: ProjectEvaluationActionProps) => {
  const [currentStatus, setCurrentStatus] = useState(status);

  useEffect(() => {
    setCurrentStatus(status);
  }, [status]);

  const approveProps = getButtonProps(currentStatus, "approve");
  const rejectProps = getButtonProps(currentStatus, "reject");

  return (
    <div className="flex gap-2">
      <Button
        onClick={() =>
          evaluateProject(currentStatus, "reject", setCurrentStatus, onEvaluate, projectId)
        }
        value="Reject"
        className={cn(baseButtonStyles, rejectProps.className)}
        icon={<Icon type={IconType.X} className={cn("size-5", rejectProps.iconFillClass)} />}
      />
      <Button
        onClick={() =>
          evaluateProject(currentStatus, "approve", setCurrentStatus, onEvaluate, projectId)
        }
        value="Approve"
        className={cn(baseButtonStyles, approveProps.className)}
        icon={<Icon type={IconType.CHECK} className={cn("size-5", approveProps.iconFillClass)} />}
      />
    </div>
  );
};
