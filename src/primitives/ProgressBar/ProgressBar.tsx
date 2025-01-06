import { Progress, ProgressVariants } from "@/ui-shadcn/progress";

export interface ProgressBarProps {
  value: number;
  className?: string;
  variant?: ProgressVariants;
}

export const ProgressBar = ({ value, className, variant }: ProgressBarProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Progress value={value} className={className} variant={variant} />
      <p className="text-sm">{value.toFixed(0)}% complete</p>
    </div>
  );
};
