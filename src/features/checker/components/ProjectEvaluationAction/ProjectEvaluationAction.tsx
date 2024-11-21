import { tv } from "tailwind-variants";
import { match } from "ts-pattern";

import { cn } from "@/lib/utils";
import { Button } from "@/primitives/Button";
import { IconType, Icon } from "@/primitives/Icon";

import { ProjectStatus, EvaluationAction } from "./types";

const baseButtonStyles = "font-mona flex gap-2 rounded-lg px-4 py-2";
const commonButtonStyles = "h-[36px] w-[111px] text-[14px]/[20px]";

const projectEvaluationActionVariants = tv({
  slots: {
    approve: `${commonButtonStyles} border border-moss-500 bg-white text-black`,
    reject: `${commonButtonStyles} border border-red-700 bg-white text-black`,
    disabled: `${commonButtonStyles} cursor-not-allowed bg-grey-100 text-grey-500`,
    approvedReject: `${commonButtonStyles} border border-red-700 bg-red-50 text-red-700`,
    rejectedApprove: `${commonButtonStyles} border border-moss-500 bg-moss-50 text-moss-500`,
  },
});

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
  const getButtonProps = (action: "approve" | "reject") =>
    match({ status, action })
      .with({ status: "pending", action: "approve" }, () => ({
        className: projectEvaluationActionVariants.slots.approve,
        disabled: false,
        iconFillClass: "fill-moss-500",
      }))
      .with({ status: "pending", action: "reject" }, () => ({
        className: projectEvaluationActionVariants.slots.reject,
        disabled: false,
        iconFillClass: "fill-red-700",
      }))
      .with({ status: "approved", action: "approve" }, () => ({
        className: projectEvaluationActionVariants.slots.disabled,
        disabled: true,
        iconFillClass: "fill-grey-500",
      }))
      .with({ status: "approved", action: "reject" }, () => ({
        className: projectEvaluationActionVariants.slots.approvedReject,
        disabled: false,
        iconFillClass: "fill-red-700",
      }))
      .with({ status: "rejected", action: "approve" }, () => ({
        className: projectEvaluationActionVariants.slots.rejectedApprove,
        disabled: false,
        iconFillClass: "fill-moss-500",
      }))
      .with({ status: "rejected", action: "reject" }, () => ({
        className: projectEvaluationActionVariants.slots.disabled,
        disabled: true,
        iconFillClass: "fill-grey-500",
      }))
      .otherwise(() => ({
        className: projectEvaluationActionVariants.slots.disabled,
        disabled: true,
        iconFillClass: "fill-grey-500",
      }));

  const approveProps = getButtonProps("approve");
  const rejectProps = getButtonProps("reject");

  return (
    <div className="flex gap-2">
      <Button
        onClick={() => onEvaluate(projectId, "reject")}
        value="Reject"
        disabled={rejectProps.disabled}
        className={cn(baseButtonStyles, rejectProps.className)}
        icon={<Icon type={IconType.X} className={cn("size-5", rejectProps.iconFillClass)} />}
      />
      <Button
        onClick={() => onEvaluate(projectId, "approve")}
        value="Approve"
        disabled={approveProps.disabled}
        className={cn(baseButtonStyles, approveProps.className)}
        icon={<Icon type={IconType.CHECK} className={cn("size-5", approveProps.iconFillClass)} />}
      />
    </div>
  );
};
