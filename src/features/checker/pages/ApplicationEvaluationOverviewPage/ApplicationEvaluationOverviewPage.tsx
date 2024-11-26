import { Hex } from "viem";

import { PoolType } from "@/components/Badges";
import { PoolSummary } from "@/components/pool/components/PoolSummary/PoolSummary";
import { ProjectBanner } from "@/components/project/components/ProjectBanner/ProjectBanner";
import { Button } from "@/primitives/Button";
import { Icon, IconType } from "@/primitives/Icon";

import { EvaluationList } from "~checker/components/EvaluationList/EvaluationList";
import { useInitialize } from "~checker/hooks";
import { useApplicationOverviewEvaluations } from "~checker/hooks/useApplicationEvaluations";
import {
  goToReviewApplicationsAction,
  goToSubmitApplicationEvaluationAction,
  useCheckerDispatchContext,
} from "~checker/store";

export interface ApplicationEvaluationOverviewPageProps {
  chainId: number;
  poolId: string;
  applicationId: string;
  address?: Hex;
}

export const ApplicationEvaluationOverviewPage = ({
  chainId,
  poolId,
  applicationId,
  address,
}: ApplicationEvaluationOverviewPageProps) => {
  useInitialize({ address: address ?? "0x", poolId, chainId });

  const { application, applicationEvaluations } =
    useApplicationOverviewEvaluations({ applicationId }) || {};

  if (!application || !applicationEvaluations) return null;

  const dispatch = useCheckerDispatchContext();

  const goToSubmitApplicationEvaluation = () => {
    dispatch(goToSubmitApplicationEvaluationAction({ projectId: applicationId }));
  };

  const goToReviewApplications = () => {
    dispatch(goToReviewApplicationsAction());
  };

  const project = application.metadata.application.project;

  return (
    <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-20">
      {/* SHITZU TODO FIX */}
      <PoolSummary
        chainId={chainId}
        poolId={poolId}
        strategy={application.round.strategyName as PoolType}
        name={"Hello World"}
        registerStartDate={new Date()}
        registerEndDate={new Date()}
        allocationStartDate={new Date()}
        allocationEndDate={new Date()}
      />
      <div>
        <Button
          variant="secondry"
          icon={<Icon type={IconType.CHEVRON_LEFT} />}
          onClick={goToReviewApplications}
          value="back to all projects"
        />
      </div>
      <ProjectBanner
        bannerImg={project.bannerImg ?? ""}
        logoImg={project.logoImg ?? ""}
        avatarPosition="left"
      />
      <h1 className="text-3xl font-medium leading-9">{project.title}</h1>
      <div className="h-0.5 bg-[#EAEAEA]" />
      <p className="leading-9 text-grey-900">
        Evaluate this project and see how others have evaluated this project.
      </p>
      <div className="flex flex-col gap-8">
        <div className="px-16">
          <EvaluationList evaluations={applicationEvaluations} />
        </div>
        <div className="flex items-center justify-center">
          <Button
            variant="primary"
            value="Perform evaluation"
            className="w-44"
            onClick={goToSubmitApplicationEvaluation}
          />
        </div>
      </div>
    </div>
  );
};
