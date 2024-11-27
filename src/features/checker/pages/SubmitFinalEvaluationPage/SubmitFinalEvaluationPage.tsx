import { useState, useMemo, useEffect } from "react";

import { match } from "ts-pattern";

import { Step } from "@/components/ProgressModal";
import { PoolSummary } from "@/components/pool/components/PoolSummary/PoolSummary";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/primitives/Button";
import { Icon, IconType } from "@/primitives/Icon";
import { StatCardGroup } from "@/primitives/StatCardGroup";

import { EvaluationAction, ProjectEvaluationList } from "~checker/components";
import { useGetApplicationsFinalEvaluationPage } from "~checker/hooks";
import {
  goToReviewApplicationsAction,
  useCheckerDispatchContext,
  useCheckerContext,
} from "~checker/store";

import { ReviewBody, SubmitFinalEvaluationModal } from ".";

export const SubmitFinalEvaluationPage = ({
  steps,
  setReviewBody,
  isReviewing,
}: {
  steps: Step[];
  setReviewBody: (reviewBody: ReviewBody | null) => void;
  isReviewing: boolean;
}) => {
  const { categorizedReviews, statCardsProps, application, reviewBody } =
    useGetApplicationsFinalEvaluationPage() || {};
  const [projectEvaluations, setProjectEvaluations] = useState<Record<string, boolean>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useCheckerDispatchContext();
  const { poolId, chainId } = useCheckerContext();
  const { toast } = useToast();

  const handleUpdateFinalEvaluations = (projectId: string, action: EvaluationAction) => {
    setProjectEvaluations((prev) => {
      return match(action)
        .with("approve", () => ({ ...prev, [projectId]: true }))
        .with("reject", () => ({ ...prev, [projectId]: false }))
        .with("skip", () => {
          if (prev[projectId] !== undefined) {
            const { [projectId]: _, ...rest } = prev;
            return rest;
          }
          return prev;
        })
        .otherwise(() => {
          return prev;
        });
    });
  };

  const numberOfOnchainEvaluations = useMemo(
    () => Object.keys(projectEvaluations).length,
    [projectEvaluations],
  );

  const handleRecordEvaluationsOnchain = () => {
    setReviewBody(reviewBody ?? null);
    setIsModalOpen(true);
  };

  const [success, error] = useMemo(() => {
    const success = steps.every((step) => step.status === "IS_SUCCESS");
    const error = steps.some((step) => step.status === "IS_ERROR");
    return [success, error];
  }, [steps]);

  useEffect(() => {
    if (success) {
      setReviewBody(null);
      setIsModalOpen(false);
      toast({ status: "success", description: "Your evaluations have been submitted" });
    }
    if (error) {
      setReviewBody(null);
      setIsModalOpen(false);
      toast({
        status: "error",
        description: "Error: Your evaluations have not been submitted. Please try again.",
      });
    }
  }, [success, error]);

  const handleCancel = () => {
    dispatch(goToReviewApplicationsAction());
  };

  const ReadyApplicationsToSubmit = categorizedReviews?.READY_TO_REVIEW || [];

  return (
    <div className="flex flex-col gap-6">
      <PoolSummary
        chainId={chainId ?? 1}
        poolId={poolId ?? "1"}
        strategyName={application?.round.strategyName ?? ""}
        name={application?.round.roundMetadata.name ?? ""}
        registerStartDate={new Date()}
        registerEndDate={new Date()}
        allocationStartDate={new Date()}
        allocationEndDate={new Date()}
      />
      <div className="mx-auto flex max-w-[1440px]">
        <div className="flex flex-col gap-6 px-20 pt-6">
          <div className="flex flex-col gap-8">
            <Button
              value="Exit"
              icon={<Icon type={IconType.X} className="fill-red-700" />}
              className="flex h-8 w-fit justify-start gap-2 bg-red-50 p-4 text-red-700"
            />
            <StatCardGroup stats={statCardsProps || []} justify="center" />
          </div>
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
                  <div className="flex gap-2">
                    <Button value="Cancel" onClick={handleCancel} />
                    <Button
                      value={`Record (${numberOfOnchainEvaluations}) evaluations onchain`}
                      disabled={Object.keys(projectEvaluations).length === 0}
                      onClick={() => {
                        setIsModalOpen(true);
                      }}
                    />
                  </div>
                </div>
                <div className="h-px bg-grey-300" />
              </div>

              <div>
                {ReadyApplicationsToSubmit.length === 0 ? (
                  <div className="font-mono text-base font-normal leading-7 text-grey-900">
                    Evaluations that are ready to be submitted onchain will appear here once
                    reviewed. Manager supports multiple reviewers.
                  </div>
                ) : (
                  <ProjectEvaluationList
                    projects={ReadyApplicationsToSubmit}
                    action={handleUpdateFinalEvaluations}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <SubmitFinalEvaluationModal
        steps={steps}
        reviews={projectEvaluations}
        onOpenChange={(isOpen: boolean) => setIsModalOpen(isOpen)}
        isOpen={isModalOpen}
        onSave={handleRecordEvaluationsOnchain}
        isReviewing={isReviewing}
      />
    </div>
  );
};
