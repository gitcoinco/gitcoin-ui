import { useEffect } from "react";

import { match, P } from "ts-pattern";

import { useCheckerContext } from "~checker/hooks/useCheckerContext";
import { useCheckerDispatchContext } from "~checker/hooks/useCheckerDispatchContext";
import { setInitialStateAction } from "~checker/store/checkerActions";
import { CheckerRoute } from "~checker/types";

import { ApplicationEvaluation } from "../ApplicationEvaluation";
import { ApplicationEvaluationOverview } from "../ApplicationEvaluationOverview";
import { ReviewApplicationsPage } from "../ReviewApplicationsPage";

export interface CheckerRouterProps {
  address: string;
  roundId: string;
  chainId: number;
}

export const CheckerRouter = ({ address, roundId, chainId }: CheckerRouterProps) => {
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
    .otherwise(() => <div>{`Route Not Found: ${JSON.stringify(route)}`}</div>);
};
