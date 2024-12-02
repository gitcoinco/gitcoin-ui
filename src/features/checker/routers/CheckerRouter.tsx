import { match, P } from "ts-pattern";
import { Hex } from "viem";

import { Step } from "@/components/ProgressModal";
import { useCheckerContext } from "@/features/checker/store/hooks/useCheckerContext";

import { useInitialize } from "~checker/hooks";
import {
  ApplicationEvaluationOverviewPage,
  ReviewApplicationsPage,
  SubmitApplicationEvaluationPage,
  SubmitFinalEvaluationPage,
} from "~checker/pages";
import { CheckerRoute } from "~checker/store";
import { EvaluationBody, ReviewBody } from "~checker/types";

export interface CheckerRouterProps {
  address: Hex;
  poolId: string;
  chainId: number;
  setEvaluationBody: (body: EvaluationBody) => void;
  isSuccess: boolean;
  isEvaluating: boolean;
  isError: boolean;
  steps: Step[];
  setReviewBody: (reviewBody: ReviewBody | null) => void;
  isReviewing: boolean;
}

export const CheckerRouter = ({
  address,
  poolId,
  chainId,
  setEvaluationBody,
  isSuccess,
  isEvaluating,
  isError,
  steps,
  setReviewBody,
  isReviewing,
}: CheckerRouterProps) => {
  useInitialize({ address, poolId, chainId });

  const { route } = useCheckerContext();

  return match(route)
    .with({ id: CheckerRoute.ReviewApplications }, () => <ReviewApplicationsPage />)
    .with(
      { id: CheckerRoute.ApplicationEvaluationOverview, projectId: P.string.minLength(1) },
      ({ projectId }) => (
        <ApplicationEvaluationOverviewPage
          chainId={chainId}
          poolId={poolId}
          applicationId={projectId}
        />
      ),
    )
    .with(
      { id: CheckerRoute.SubmitApplicationEvaluation, projectId: P.string.minLength(1) },
      ({ projectId }) => {
        return (
          <SubmitApplicationEvaluationPage
            setEvaluationBody={setEvaluationBody}
            isSuccess={isSuccess}
            isEvaluating={isEvaluating}
            isError={isError}
            applicationId={projectId}
            chainId={chainId}
            poolId={poolId}
          />
        );
      },
    )
    .with({ id: CheckerRoute.SubmitFinalEvaluation }, () => (
      <SubmitFinalEvaluationPage
        steps={steps}
        setReviewBody={setReviewBody}
        isReviewing={isReviewing}
      />
    ))
    .otherwise(() => <div>{`Route Not Found: ${JSON.stringify(route)}`}</div>);
};
