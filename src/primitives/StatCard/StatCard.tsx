import { Card } from "@/ui-shadcn/card";

export type StatCardProps = {
  label: string;
  value: string;
};

export const StatCard = ({ label, value }: StatCardProps) => {
  return (
    <Card className="flex h-[132px] w-[220.5px] flex-col justify-between rounded-[24px] border-0 bg-grey-50 p-6">
      <div className="font-mono text-[32px]/[41.66px] font-normal text-grey-500">{value}</div>
      {/* install modern era for label */}
      <div className="font-mono text-[14px]/[20px] font-bold text-grey-400">{label}</div>
    </Card>
  );
};