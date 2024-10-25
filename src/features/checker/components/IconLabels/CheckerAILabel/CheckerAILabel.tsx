import { Icon, IconType } from "@/primitives/Icon";
import { cn } from "@/lib/utils";

export type CheckerAILabelProps = React.HTMLAttributes<HTMLDivElement> & {
  percent: number;
};

export const CheckerAILabelComponents: React.FC<CheckerAILabelProps> = ({ className, percent }) => {
  const evaluationMessage = getEvaluationMessage(percent);
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Icon type={IconType.SPARKLES} className={"size-5 fill-green-600"} />
      <span className="text-[16px]/[24px]">{`${evaluationMessage}`}</span>
    </div>
  );
};
export const CheckerAILabel: React.FC<CheckerAILabelProps> = ({ percent, className, ...props }) => {
  return <CheckerAILabelComponents className={className} percent={percent} {...props} />;
};

function getEvaluationMessage(percent: number): string {
  if (percent > 100) {
    percent = 100;
  }
  if (percent < 0) {
    percent = 0;
  }
  if (percent > 60) {
    return `Approve (${percent}%)`;
  } else if (percent > 50 && percent <= 60) {
    return `Uncertain (${percent}%)`;
  } else if (percent > 40 && percent <= 50) {
    return `Uncertain (${percent}%)`;
  } else {
    return `Reject (${percent}%)`;
  }
}
