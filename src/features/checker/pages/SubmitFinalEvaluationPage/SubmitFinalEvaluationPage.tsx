import { useState, useMemo } from "react";

import { match } from "ts-pattern";

import { Button } from "@/primitives/Button";
import { Icon, IconType } from "@/primitives/Icon";
import { StatCardGroup } from "@/primitives/StatCardGroup";

import { EvaluationAction, ProjectEvaluationList } from "~checker/components";
import { useGetApplicationsReviewPage } from "~checker/hooks";

export const SubmitFinalEvaluation = () => {
  const { categorizedReviews, statCardsProps } = useGetApplicationsReviewPage() || {};

  const [projectEvaluations, setProjectEvaluations] = useState<Record<string, boolean>>({});

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
    console.log("Record evaluations onchain", projectEvaluations);
  };

  const ReadyApplicationsToSubmit = categorizedReviews?.READY_TO_REVIEW || [];

  return (
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
                <Button value="cancel" />
                <Button
                  value={`Record (${numberOfOnchainEvaluations}) evaluations onchain`}
                  disabled={Object.keys(projectEvaluations).length === 0}
                  onClick={handleRecordEvaluationsOnchain}
                />
              </div>
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
              <ProjectEvaluationList
                projects={ReadyApplicationsToSubmit}
                action={handleUpdateFinalEvaluations}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
