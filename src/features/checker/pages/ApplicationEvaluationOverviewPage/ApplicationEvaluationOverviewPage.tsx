import { Hex } from "viem";

import { PoolSummary, ProjectBanner } from "@/components";
import { Button, Icon, IconType } from "@/primitives";

import { EvaluationList } from "~checker/components";
import { useApplicationOverviewEvaluations, useInitialize } from "~checker/hooks";
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

  if (!application) return null;

  const dispatch = useCheckerDispatchContext();

  const goToSubmitApplicationEvaluation = () => {
    dispatch(goToSubmitApplicationEvaluationAction({ projectId: applicationId }));
  };

  const goToReviewApplications = () => {
    dispatch(goToReviewApplicationsAction());
  };

  const project = application.metadata.application.project;

  return (
    <div className="flex flex-col gap-6">
      <PoolSummary
        chainId={chainId}
        poolId={poolId}
        strategyName={application.round.strategyName}
        name={application.round.roundMetadata.name}
        registerStartDate={new Date(application.round.applicationsStartTime)}
        registerEndDate={new Date(application.round.applicationsEndTime)}
        allocationStartDate={new Date(application.round.donationsStartTime)}
        allocationEndDate={new Date(application.round.donationsEndTime)}
      />
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-20">
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
            {applicationEvaluations ? (
              <EvaluationList evaluations={applicationEvaluations} />
            ) : (
              <p className="text-center text-lg">
                No evaluations have been submitted for this project yet.
              </p>
            )}
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
    </div>
  );
};
