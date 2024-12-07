import { useMemo } from "react";

import { PoolSummary } from "@/components";
import { Button, Icon, IconType, StatCardGroup } from "@/primitives";

import { ProjectReviewList } from "~checker/components";
import { useGetApplicationsReviewPage } from "~checker/hooks";
import {
  goToApplicationEvaluationOverviewAction,
  goToSubmitFinalEvaluationAction,
  useCheckerContext,
  useCheckerDispatchContext,
} from "~checker/store";

const canSubmitFinalEvaluation = true;

export const ReviewApplicationsPage = () => {
  const { categorizedReviews, statCardsProps, poolData } = useGetApplicationsReviewPage() || {};
  const { poolId, chainId, address } = useCheckerContext();
  const {
    ReadyApplicationsToSubmit,
    PendingApplications,
    ApprovedApplications,
    RejectedApplications,
  } = useMemo(() => {
    return {
      ReadyApplicationsToSubmit: categorizedReviews?.READY_TO_REVIEW || [],
      PendingApplications: categorizedReviews?.INREVIEW || [],
      ApprovedApplications: categorizedReviews?.APPROVED || [],
      RejectedApplications: categorizedReviews?.REJECTED || [],
    };
  }, [categorizedReviews, poolData]);

  const dispatch = useCheckerDispatchContext();

  if (!poolId || !chainId) return null;

  const goToApplicationEvaluationOverview = (projectId: string) => {
    dispatch(goToApplicationEvaluationOverviewAction({ projectId }));
  };

  const goToSubmitFinalEvaluation = () => {
    dispatch(goToSubmitFinalEvaluationAction());
  };

  const openRoundInManager = () => {
    window.open(`https://manager.gitcoin.co/#/chain/${chainId}/round/${poolId}`, "_blank");
  };

  const openCheckerApplicationEvaluations = (projectId: string) => {
    window.open(
      `https://beta.checker.gitcoin.co/view/application/${chainId}/${poolId}/${projectId}`,
      "_blank",
    );
  };
  return (
    <div className="flex flex-col gap-6 ">
      <PoolSummary
        chainId={chainId}
        poolId={poolId}
        programId={poolData?.project.id as string}
        strategyName={poolData?.strategyName}
        name={poolData?.roundMetadata?.name}
        applicationsStartTime={poolData?.applicationsStartTime}
        applicationsEndTime={poolData?.applicationsEndTime}
        donationsStartTime={poolData?.donationsStartTime}
        donationsEndTime={poolData?.donationsEndTime}
      />
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-20">
        <div className="flex justify-start">
          <Button
            variant="secondry"
            icon={<Icon type={IconType.CHEVRON_LEFT} />}
            onClick={openRoundInManager}
            value="back to round manager"
          />
        </div>
        <StatCardGroup stats={statCardsProps || []} justify="center" />
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="font-sans text-2xl font-medium leading-loose text-black">
              Review applications
            </div>
            <div className="font-sans text-base font-normal leading-7 text-grey-900">
              Evaluate projects here.
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="pb-1">
              <div className="flex items-center justify-between pb-1">
                <div className="font-sans text-2xl font-medium leading-loose text-black">
                  {`Ready to submit (${ReadyApplicationsToSubmit.length})`}
                </div>
                <Button
                  value="Submit final evaluation"
                  disabled={!canSubmitFinalEvaluation}
                  onClick={goToSubmitFinalEvaluation}
                />
              </div>
              <div className="h-px bg-grey-300" />
            </div>

            <div>
              {ReadyApplicationsToSubmit.length === 0 ? (
                <div className="font-sans text-base font-normal leading-7 text-grey-900">
                  Evaluations that are ready to be submitted onchain will appear here once reviewed.
                  Manager supports multiple reviewers.
                </div>
              ) : (
                <ProjectReviewList
                  reviewer={address}
                  projects={ReadyApplicationsToSubmit}
                  action={goToApplicationEvaluationOverview}
                  isPoolManager={poolData?.isPoolManager}
                />
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="pb-1">
              <div className="flex items-center justify-start pb-1">
                <div className="font-sans text-2xl font-medium leading-loose text-black">
                  {`In Review (${PendingApplications.length})`}
                </div>
              </div>
              <div className="h-px bg-[#c8cccc]" />
            </div>

            <div>
              {PendingApplications.length === 0 ? (
                <div className="font-sans text-base font-normal leading-7 text-grey-900">
                  No applications are currently in review.
                </div>
              ) : (
                <ProjectReviewList
                  reviewer={address}
                  projects={PendingApplications}
                  action={goToApplicationEvaluationOverview}
                  isPoolManager={poolData?.isPoolManager}
                />
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="pb-1">
              <div className="flex items-center justify-start pb-1">
                <div className="font-mono text-2xl font-medium leading-loose text-black">
                  {`Approved applications (${ApprovedApplications.length})`}
                </div>
              </div>
              <div className="h-px bg-[#c8cccc]" />
            </div>

            <div>
              {ApprovedApplications.length === 0 ? (
                <div className="font-mono text-base font-normal leading-7 text-grey-900">
                  No approved applications.
                </div>
              ) : (
                <ProjectReviewList
                  reviewer={address}
                  projects={ApprovedApplications}
                  action={openCheckerApplicationEvaluations}
                  actionLabel="View evaluations"
                  keepAction
                />
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="pb-1">
              <div className="flex items-center justify-start pb-1">
                <div className="font-mono text-2xl font-medium leading-loose text-black">
                  {`Rejected applications (${RejectedApplications.length})`}
                </div>
              </div>
              <div className="h-px bg-[#c8cccc]" />
            </div>

            <div>
              {RejectedApplications.length === 0 ? (
                <div className="font-mono text-base font-normal leading-7 text-grey-900">
                  No rejected applications.
                </div>
              ) : (
                <ProjectReviewList
                  reviewer={address}
                  projects={RejectedApplications}
                  action={openCheckerApplicationEvaluations}
                  actionLabel="View evaluations"
                  keepAction
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
