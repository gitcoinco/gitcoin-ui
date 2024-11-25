import { match, P } from "ts-pattern";
import { Hex } from "viem";

import { useCheckerContext } from "@/features/checker/store/hooks/useCheckerContext";

import {
  ApplicationEvaluationOverviewPage,
  ReviewApplicationsPage,
  SubmitApplicationEvaluationPage,
  SubmitFinalEvaluation,
} from "~checker/pages";
import { CheckerRoute } from "~checker/store";

import { useInitialize } from "./hooks";

export interface CheckerRouterProps {
  address: Hex;
  poolId: string;
  chainId: number;
}

export const CheckerRouter = ({ address, poolId, chainId }: CheckerRouterProps) => {
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
      ({ projectId }) => (
        <SubmitApplicationEvaluationPage
          chainId={chainId}
          poolId={poolId}
          applicationId={projectId}
        />
      ),
    )
    .with({ id: CheckerRoute.SubmitFinalEvaluation }, () => <SubmitFinalEvaluation />)
    .otherwise(() => <div>{`Route Not Found: ${JSON.stringify(route)}`}</div>);
};
