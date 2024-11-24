import { Hex } from "viem";

import EvaluationForm from "@/components/EvaluationForm/EvaluationForm";
import { ProjectBanner } from "@/components/project/components/ProjectBanner/ProjectBanner";

import { useInitialize } from "~checker/hooks";
import { useApplicationOverviewEvaluations } from "~checker/hooks/useApplicationEvaluations";

export interface SubmitApplicationEvaluationPageProps {
  chainId: number;
  poolId: string;
  applicationId: string;
  address?: Hex;
}

export const SubmitApplicationEvaluationPage = ({
  chainId,
  poolId,
  applicationId,
  address,
}: SubmitApplicationEvaluationPageProps) => {
  useInitialize({ address: address ?? "0x", poolId, chainId });

  const { application, evaluationQuestions } =
    useApplicationOverviewEvaluations({ applicationId }) || {};

  if (!application || !evaluationQuestions) return null;

  const project = application.metadata.application.project;
  const groups = evaluationQuestions.map((q) => ({
    id: q.questionIndex.toString(),
    heading: q.question,
  }));

  const handleSubmit = (data: any) => {
    // TODO
    console.log(data);
  };

  return (
    <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-20">
      <ProjectBanner
        bannerImg={project.bannerImg ?? ""}
        logoImg={project.logoImg ?? ""}
        avatarPosition="left"
      />
      <h1 className="text-3xl font-medium leading-9">Evaluate {project.title}</h1>
      <div className="h-0.5 bg-[#EAEAEA]" />

      <div className="flex flex-col">
        <div>TODO</div>
        <EvaluationForm groups={groups} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};
