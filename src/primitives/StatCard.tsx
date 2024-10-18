import { Card } from "@/ui-shadcn/card";

export type StatCardProps = {
  label: string;
  value: string;
};

export const StatCard = ({ label, value }: StatCardProps) => {
  return (
    <Card className="ui-flex ui-h-[132px] ui-w-[220.5px] ui-flex-col ui-justify-between ui-rounded-[24px] ui-border-0 ui-bg-grey-50 ui-p-6">
      <div className="ui-font-mono ui-text-[32px]/[41.66px] ui-font-normal">{value}</div>
      {/* install modern era for label */}
      <div className="ui-font-mono ui-text-[14px]/[20px] ui-font-bold ui-text-grey-400">
        {label}
      </div>
    </Card>
  );
};
