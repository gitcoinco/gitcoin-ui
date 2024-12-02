import { Address } from "viem";

import { useCheckerContext } from "@/features/checker/store/hooks/useCheckerContext";
import { PoolType } from "@/types";

import { generatePoolUUID } from "~checker/utils/generatePoolUUID";
import { categorizeProjectReviews } from "~checker/utils/mapApplicationsForOverviewPage";

import { ApplicationStatusType, ReviewBody } from "../types";

export const useGetApplicationsFinalEvaluationPage = () => {
  const { poolId, chainId, poolsData } = useCheckerContext();

  const poolUUID = generatePoolUUID(poolId, chainId);

  const poolData = poolUUID ? poolsData[poolUUID] : null;

  if (!poolData) return null;

  const { categorizedReviews, statCardsProps } = categorizeProjectReviews(poolData.applications);

  const reviewBody: ReviewBody = {
    roundId: poolId as string,
    strategyAddress: poolData.strategyAddress as Address,
    applicationsToUpdate: [],
    currentApplications: Object.values(poolData.applications).map((app) => ({
      index: Number(app.id),
      status: app.status as ApplicationStatusType,
    })),
    strategy: poolData.strategyName === PoolType.QuadraticFunding ? 0 : 1,
  };

  return { categorizedReviews, statCardsProps, reviewBody, poolData };
};
