import { useCheckerContext } from "@/features/checker/store/hooks/useCheckerContext";

import { generatePoolUUID } from "~checker/utils/generatePoolUUID";
import { categorizeProjectReviews } from "~checker/utils/mapApplicationsForOverviewPage";

export const useGetApplicationsReviewPage = () => {
  const { poolId, chainId, poolsData } = useCheckerContext();

  const poolUUID = generatePoolUUID(poolId, chainId);

  const poolData = poolUUID ? poolsData[poolUUID] : null;

  if (!poolData) return null;

  const { categorizedReviews, statCardsProps, application } = categorizeProjectReviews(
    poolData.applications,
  );

  return { categorizedReviews, statCardsProps, application };
};
