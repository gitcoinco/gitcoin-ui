import { PoolSummary } from "@/components/pool/components/PoolSummary/PoolSummary";
import { Button } from "@/primitives/Button";
import { Icon, IconType } from "@/primitives/Icon";
import { StatCardGroup } from "@/primitives/StatCardGroup";

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
  const { categorizedReviews, statCardsProps, application } = useGetApplicationsReviewPage() || {};
  const dispatch = useCheckerDispatchContext();
  const { poolId, chainId, address } = useCheckerContext();

  if (!poolId || !chainId) return null;

  const goToApplicationEvaluationOverview = (projectId: string) => {
    dispatch(goToApplicationEvaluationOverviewAction({ projectId }));
  };

  const goToSubmitFinalEvaluation = () => {
    dispatch(goToSubmitFinalEvaluationAction());
  };

  const ReadyApplicationsToSubmit = categorizedReviews?.READY_TO_REVIEW || [];

  const PendingApplications = categorizedReviews?.INREVIEW || [];

  return (
    <div className="flex flex-col gap-6 ">
      <PoolSummary
        chainId={chainId}
        poolId={poolId}
        strategyName={application?.round.strategyName ?? ""}
        name={application?.round.roundMetadata.name ?? ""}
        registerStartDate={new Date()}
        registerEndDate={new Date()}
        allocationStartDate={new Date()}
        allocationEndDate={new Date()}
      />
      <div className="mx-auto flex max-w-[1440px] flex-col  gap-6 px-20">
        <div className="flex justify-start">
          <Button
            variant="secondry"
            icon={<Icon type={IconType.CHEVRON_LEFT} />}
            onClick={() =>
              window.open(`https://manager.gitcoin.co/#/chain/${chainId}/round/${poolId}`)
            }
            value="back to round manager"
          />
        </div>
        <StatCardGroup stats={statCardsProps || []} justify="center" />
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <div className="font-mono text-2xl font-medium leading-loose text-black">
              Review applications
            </div>
            <div className="font-mono text-base font-normal leading-7 text-grey-900">
              Evaluate projects here.
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="pb-1">
              <div className="flex items-center justify-between pb-1">
                <div className="font-mono text-2xl font-medium leading-loose text-black">
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
                <div className="font-mono text-base font-normal leading-7 text-grey-900">
                  Evaluations that are ready to be submitted onchain will appear here once reviewed.
                  Manager supports multiple reviewers.
                </div>
              ) : (
                <ProjectReviewList
                  reviewer={address || "0x"}
                  projects={ReadyApplicationsToSubmit}
                  action={goToApplicationEvaluationOverview}
                />
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="pb-1">
              <div className="flex items-center justify-start pb-1">
                <div className="font-mono text-2xl font-medium leading-loose text-black">
                  {`In Review (${PendingApplications.length})`}
                </div>
              </div>
              <div className="h-px bg-[#c8cccc]" />
            </div>

            <div>
              {PendingApplications.length === 0 ? (
                <div className="font-mono text-base font-normal leading-7 text-grey-900">
                  No applications are currently in review.
                </div>
              ) : (
                <ProjectReviewList
                  reviewer={address || "0x"}
                  projects={PendingApplications}
                  action={goToApplicationEvaluationOverview}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
