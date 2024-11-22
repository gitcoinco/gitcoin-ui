import { useCheckerContext } from "@/features/checker/store/hooks/useCheckerContext";

import { generatePoolUUID } from "~checker/utils/generatePoolUUID";

export const useApplicationOverviewEvaluations = ({ applicationId }: { applicationId: string }) => {
  const { poolId, chainId, poolsData } = useCheckerContext();

  const poolUUID = generatePoolUUID(poolId, chainId);

  const poolData = poolUUID ? poolsData[poolUUID] : null;

  if (!poolData) return null;

  return {
    application: poolData.applications[applicationId],
    applicationEvaluations: poolData.applications[applicationId].evaluations,
  };
};
