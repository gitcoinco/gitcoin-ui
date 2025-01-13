"use client";

import { Address } from "viem";

import { useCheckerContext } from "@/features/checker/store/hooks/useCheckerContext";
import { PoolType } from "@/types";

import { DefaultStatCardsProps } from "~checker/constants";
import { ApplicationStatusType, ReviewBody } from "~checker/types";
import { categorizeProjectReviews, generatePoolUUID } from "~checker/utils";

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
