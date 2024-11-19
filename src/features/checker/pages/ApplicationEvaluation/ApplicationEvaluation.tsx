export interface ApplicationEvaluationProps {
  projectId: string;
}

export const ApplicationEvaluation = ({ projectId }: ApplicationEvaluationProps) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-[12px]">
        <div className="font-mono text-2xl font-medium leading-loose text-black">
          Application Evaluation
        </div>
        <div className="font-mono text-base font-normal leading-7 text-[#555555]">
          {`Evaluate ${projectId} here.`}
        </div>
      </div>
    </div>
  );
};
