import { useQuery } from "@tanstack/react-query";

import { useCheckerContext } from "@/features/checker/store/hooks/useCheckerContext";

import { getApplicationsFromIndexer } from "~checker/services/allo";
import { getCheckerPoolData } from "~checker/services/checker";
import { categorizeProjectReviews } from "~checker/utils/mapApplicationsForOverviewPage";

export const useApplications = () => {
  const { applications } = useCheckerContext();
  return applications;
};

export const useGetApplicationsReviewPage = () => {
  const { address, roundId, chainId } = useCheckerContext();

  const query = useQuery({
    enabled: !!address && !!roundId && !!chainId,
    queryKey: ["applicationsReviewPage", chainId, roundId],
    queryFn: async () => {
      const applicationManagerList = await getApplicationsFromIndexer(chainId, roundId);
      const poolData = await getCheckerPoolData(chainId, roundId);
      const { categorizedReviews, statCardsProps } = categorizeProjectReviews(
        poolData.applications,
        applicationManagerList,
      );
      return { categorizedReviews, statCardsProps };
    },
  });
  return query;
};
