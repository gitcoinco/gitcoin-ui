import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import { useCheckerContext } from "@/features/checker/store/hooks/useCheckerContext";
import { isPoolManager, setPoolFetchStateAction, syncPool, SyncPoolBody } from "@/mainAll";

import { getApplicationsFromIndexer } from "~checker/services/allo";
import { getCheckerPoolData } from "~checker/services/checker";
import {
  CheckerApplication,
  CheckerPoolData,
  PoolInfo,
  setPoolDataAction,
  useCheckerDispatchContext,
} from "~checker/store";
import { generatePoolUUID } from "~checker/utils/generatePoolUUID";

export const usePoolData = (): { poolData: CheckerPoolData | null; refetch: () => void } => {
  const { poolsData, poolId, chainId, address } = useCheckerContext();
  const dispatch = useCheckerDispatchContext();
  const enabled = !!poolId && !!chainId && !!address;

  const poolUUID = generatePoolUUID(poolId, chainId);

  const { data, isFetching, isLoading, isError, error, refetch } = useQuery({
    enabled,
    queryKey: ["poolData", chainId, poolId, address],
    queryFn: async () => {
      await syncPool({ chainId, alloPoolId: poolId } as SyncPoolBody);
      const applicationsIndexer = await getApplicationsFromIndexer(chainId, poolId);
      const { applications: applicationsCheckerApi, evaluationQuestions } =
        await getCheckerPoolData(chainId, poolId);

      const applications: Record<string, Partial<CheckerApplication>> = {};
      for (const applicationIndexer of applicationsIndexer.applications) {
        applications[applicationIndexer.id] = {
          ...applicationIndexer,
        };
      }

      for (const applicationCheckerApi of applicationsCheckerApi) {
        applications[applicationCheckerApi.alloApplicationId] = {
          ...applications[applicationCheckerApi.alloApplicationId],
          ...applicationCheckerApi,
        };
      }
      return {
        applications: applications as Record<string, CheckerApplication>,
        evaluationQuestions,
        roundData: applicationsIndexer.roundData,
      };
    },
  });

  useEffect(() => {
    if (poolId && chainId) {
      dispatch(
        setPoolFetchStateAction({
          poolId,
          chainId,
          lastFetchedAt: new Date(),
          isLoading: isLoading,
          isFetching,
          isError,
          error,
        }),
      );
    }
  }, [poolId, chainId, isLoading, isFetching, isError, error]);

  useEffect(() => {
    if (data && poolId && chainId && address) {
      const managers = data.roundData.roles.map((role) => role.address.toLowerCase());
      dispatch(
        setPoolDataAction({
          poolId,
          chainId,
          isPoolManager: isPoolManager(address, managers),
          applications: data.applications,
          evaluationQuestions: data.evaluationQuestions,
          ...(data.roundData as PoolInfo),
        }),
      );
    }
  }, [data, poolId, chainId, address, isLoading, isFetching, isError, error]);

  const poolData = poolUUID ? poolsData[poolUUID] || null : null;

  return { poolData, refetch };
};
