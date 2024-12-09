import { useCheckerContext } from "@/features/checker/store/hooks/useCheckerContext";
import { DefaultStatCardsProps } from "@/mainAll";

import { generatePoolUUID } from "~checker/utils/generatePoolUUID";
import { categorizeProjectReviews } from "~checker/utils/mapApplicationsForOverviewPage";

export const useGetApplicationsReviewPage = () => {
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

  const { categorizedReviews, statCardsProps } = categorizeProjectReviews(poolData?.applications);

  return {
    categorizedReviews,
    statCardsProps: statCardsProps ?? DefaultStatCardsProps,
    poolData,
    poolFetchState,
  };
};
