import { Address } from "viem";

import { useCheckerContext } from "@/features/checker/store/hooks/useCheckerContext";
import { DefaultStatCardsProps } from "@/mainAll";
import { PoolType } from "@/types";

import { generatePoolUUID } from "~checker/utils/generatePoolUUID";
import { categorizeProjectReviews } from "~checker/utils/mapApplicationsForOverviewPage";

import { ApplicationStatusType, ReviewBody } from "../types";

export const useGetApplicationsFinalEvaluationPage = () => {
  const { poolId, chainId, poolsData, poolsFetchState } = useCheckerContext();

  const poolUUID = generatePoolUUID(poolId, chainId);

  if (!poolUUID) return null;

  const poolData = poolsData[poolUUID];

  const poolFetchState = poolsFetchState[poolUUID];

  if (!poolData?.applications) {
    return {
      statCardsProps: DefaultStatCardsProps,
      poolData,
      poolFetchState,
    };
  }

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

  return {
    categorizedReviews,
    statCardsProps: statCardsProps ?? DefaultStatCardsProps,
    reviewBody,
    poolData,
    poolFetchState,
  };
};
