import { useCheckerContext } from "@/features/checker/store/hooks/useCheckerContext";

import { categorizeProjectReviews } from "~checker/utils/mapApplicationsForOverviewPage";

import { generatePoolUUID } from "../utils/generatePoolUUID";

export const useGetApplicationsReviewPage = () => {
  const { poolId, chainId, poolsData } = useCheckerContext();

  const poolUUID = generatePoolUUID(poolId, chainId);

  const poolData = poolUUID ? poolsData[poolUUID] : null;

  if (!poolData) return null;

  const { categorizedReviews, statCardsProps } = categorizeProjectReviews(poolData.applications);

  return { categorizedReviews, statCardsProps };
};
