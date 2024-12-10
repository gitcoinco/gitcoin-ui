import { Card } from "@/ui-shadcn/card";

export interface StatCardProps {
  label: string;
  value: string;
}

export const StatCard = ({ label, value }: StatCardProps) => {
  return (
    <Card className="flex h-[132px] w-[220.5px] flex-col justify-between rounded-[24px] border-0 bg-grey-50 p-6">
      <div className="font-ui-mono text-[32px]/[41.66px] font-normal text-grey-900">{value}</div>
      <div className="font-ui-sans text-[14px]/[20px] font-medium text-grey-900">{label}</div>
    </Card>
  );
};
