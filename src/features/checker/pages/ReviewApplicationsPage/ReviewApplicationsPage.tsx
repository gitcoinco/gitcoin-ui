import { ProjectReviewList } from "@/features/checker/components/ProjectReviewList/ProjectReviewList";
import { Button } from "@/primitives/Button";
import { Icon, IconType } from "@/primitives/Icon";
import { StatCardGroup } from "@/primitives/StatCardGroup";

import { useGetApplicationsReviewPage } from "~checker/hooks/useApplications";
import { useCheckerContext } from "~checker/hooks/useCheckerContext";
import { useCheckerDispatchContext } from "~checker/hooks/useCheckerDispatchContext";

const canSubmitFinalEvaluation = true;

export const ReviewApplicationsPage = () => {
  const { data } = useGetApplicationsReviewPage();
  const dispatch = useCheckerDispatchContext();
  const { address } = useCheckerContext();

  const goToApplicatoinEvaluation = (projectId: string) => {
    dispatch({ type: "GO_TO_APPLICATION_EVALUATION", payload: { projectId: projectId } });
  };

  const goToSubmitFinalEvaluation = () => {
    dispatch({ type: "GO_TO_SUBMIT_FINAL_EVALUATION" });
  };

  const ReadyApplicationsToSubmit = data?.categorizedReviews.READY_TO_REVIEW || [];

  const PendingApplications = data?.categorizedReviews.INREVIEW || [];
  return (
    <div className="flex flex-col gap-6 px-20 pt-6">
      <div className="flex flex-col gap-8">
        <Button
          value="Exit"
          icon={<Icon type={IconType.X} className="fill-red-700" />}
          className="flex h-8 w-fit justify-start gap-2 bg-red-50 p-4 text-red-700"
        />
        <StatCardGroup stats={data?.statCardsProps || []} justify="center" />
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="font-mono text-2xl font-medium leading-loose text-black">
            Review applications
          </div>
          <div className="font-mono text-base font-normal leading-7 text-gray-900">
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
            <div className="h-px bg-gray-300" />
          </div>

          <div>
            {ReadyApplicationsToSubmit.length === 0 ? (
              <div className="font-mono text-base font-normal leading-7 text-gray-900">
                Evaluations that are ready to be submitted onchain will appear here once reviewed.
                Manager supports multiple reviewers.
              </div>
            ) : (
              <ProjectReviewList
                reviewer={address || "0x"}
                projects={ReadyApplicationsToSubmit}
                action={goToApplicatoinEvaluation}
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
              <div className="font-mono text-base font-normal leading-7 text-gray-900">
                No applications are currently in review.
              </div>
            ) : (
              <ProjectReviewList
                reviewer={address || "0x"}
                projects={PendingApplications}
                action={goToApplicatoinEvaluation}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
