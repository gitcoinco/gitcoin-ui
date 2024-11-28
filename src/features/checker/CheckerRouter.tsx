import { match, P } from "ts-pattern";
import { Hex } from "viem";

import { Step } from "@/components/ProgressModal";
import { useCheckerContext } from "@/features/checker/store/hooks/useCheckerContext";

import { useInitialize } from "~checker/hooks";
import {
  ApplicationEvaluationOverviewPage,
  ReviewApplicationsPage,
  ReviewBody,
  SubmitApplicationEvaluationPage,
  SubmitFinalEvaluationPage,
} from "~checker/pages";
import { EvaluationBody } from "~checker/services/checker/api";
import { CheckerRoute } from "~checker/store";

export interface CheckerRouterProps {
  address: Hex;
  poolId: string;
  chainId: number;
  setEvaluationBody: (body: EvaluationBody) => void;
  isSigning: boolean;
  isSuccess: boolean;
  isEvaluating: boolean;
  isError: boolean;
  isErrorSigning: boolean;
  steps: Step[];
  setReviewBody: (reviewBody: ReviewBody | null) => void;
  isReviewing: boolean;
}

export const CheckerRouter = ({
  address,
  poolId,
  chainId,
  setEvaluationBody,
  isSigning,
  isSuccess,
  isEvaluating,
  isError,
  isErrorSigning,
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
