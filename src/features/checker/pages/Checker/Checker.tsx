import { useEffect } from "react";

import { match, P } from "ts-pattern";
import { Hex } from "viem";

import { useCheckerContext } from "~checker/hooks/useCheckerContext";
import { useCheckerDispatchContext } from "~checker/hooks/useCheckerDispatchContext";
import { CheckerProvider } from "~checker/store/CheckerProvider";
import { setInitialStateAction } from "~checker/store/checkerActions";
import { CheckerRoute } from "~checker/types";

import { ApplicationEvaluation } from "../ApplicationEvaluation";
import { ApplicationEvaluationOverview } from "../ApplicationEvaluationOverview";
import { ReviewApplicationsPage } from "../ReviewApplicationsPage";
import { SubmitFinalEvaluation } from "../SubmitFinalEvaluationPage";

export interface CheckerProps {
  address: Hex;
  roundId: string;
  chainId: number;
}

const CheckerRouter = ({ address, roundId, chainId }: CheckerProps) => {
  const dispatch = useCheckerDispatchContext();

  useEffect(() => {
    dispatch(setInitialStateAction({ address, roundId, chainId }));
  }, [address, roundId, chainId]);

  const { route } = useCheckerContext();

  return match(route)
    .with({ id: CheckerRoute.ReviewApplications }, () => <ReviewApplicationsPage />)
    .with(
      { id: CheckerRoute.ApplicationEvaluationOverview, projectId: P.string.minLength(1) },
      ({ projectId }) => <ApplicationEvaluationOverview projectId={projectId} />,
    )
    .with(
      { id: CheckerRoute.ApplicationEvaluation, projectId: P.string.minLength(1) },
      ({ projectId }) => <ApplicationEvaluation projectId={projectId} />,
    )
    .with({ id: CheckerRoute.SubmitFinalEvaluation }, () => <SubmitFinalEvaluation />)
    .otherwise(() => <div>{`Route Not Found: ${JSON.stringify(route)}`}</div>);
};

export const Checker = (props: CheckerProps) => {
  return (
    <CheckerProvider>
      <CheckerRouter {...props} />
    </CheckerProvider>
  );
};
