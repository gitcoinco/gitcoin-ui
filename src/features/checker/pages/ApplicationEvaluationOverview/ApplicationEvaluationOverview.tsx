export interface ApplicationEvaluationOverviewProps {
  projectId: string;
}

export const ApplicationEvaluationOverview = ({
  projectId,
}: ApplicationEvaluationOverviewProps) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-[12px]">
        <div className="font-mono text-2xl font-medium leading-loose text-black">
          Application Evaluation Overview
        </div>
        <div className="font-mono text-base font-normal leading-7 text-[#555555]">
          {`Previous evaluations for ${projectId} here.`}
        </div>
      </div>
    </div>
  );
};
