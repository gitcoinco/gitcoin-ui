import { match, P } from "ts-pattern";
import { Hex } from "viem";

import { useCheckerContext } from "@/features/checker/store/hooks/useCheckerContext";

import { useInitialize, usePerformEvaluation, usePerformOnChainReview } from "~checker/hooks";
import {
  ApplicationEvaluationOverviewPage,
  ReviewApplicationsPage,
  SubmitApplicationEvaluationPage,
  SubmitFinalEvaluationPage,
} from "~checker/pages";
import { CheckerRoute } from "~checker/store";

export interface CheckerRouterProps {
  address: Hex;
  poolId: string;
  chainId: number;
}

export const CheckerRouter = ({ address, poolId, chainId }: CheckerRouterProps) => {
  useInitialize({ address, poolId, chainId });
  const { setEvaluationBody, isSigning, isSuccess, isEvaluating, isError, isErrorSigning } =
    usePerformEvaluation();
  const { route } = useCheckerContext();

  const {
    steps,
    setReviewBody,
    isSuccess: isReviewSuccess,
    isError: isReviewError,
    isReviewing,
  } = usePerformOnChainReview();

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
            isSigning={isSigning}
            isErrorSigning={isErrorSigning}
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
