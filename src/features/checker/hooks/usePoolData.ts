import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import { useCheckerContext } from "@/features/checker/store/hooks/useCheckerContext";

import { getApplicationsFromIndexer } from "~checker/services/allo";
import { getCheckerPoolData } from "~checker/services/checker";

import {
  CheckerApplication,
  CheckerPoolData,
  setPoolDataAction,
  useCheckerDispatchContext,
} from "../store";
import { generatePoolUUID } from "../utils/generatePoolUUID";

export const usePoolData = (): { poolData: CheckerPoolData | null; refetch: () => void } => {
  const { poolsData, poolId, chainId } = useCheckerContext();
  const dispatch = useCheckerDispatchContext();
  const enabled = !!poolId && !!chainId;

  const poolUUID = generatePoolUUID(poolId, chainId);

  const { data, isFetching, isLoading, isError, error, refetch } = useQuery({
    enabled,
    queryKey: ["poolData", chainId, poolId],
    queryFn: async () => {
      const applicationsIndexer = await getApplicationsFromIndexer(chainId, poolId);
      const { applications: applicationsCheckerApi, evaluationQuestions } =
        await getCheckerPoolData(chainId, poolId);

      const applications: Record<string, Partial<CheckerApplication>> = {};

      for (const applicationIndexer of applicationsIndexer) {
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
      };
    },
  });

  useEffect(() => {
    if (data && poolId && chainId) {
      dispatch(
        setPoolDataAction({
          poolId,
          chainId,
          applications: data.applications,
          evaluationQuestions: data.evaluationQuestions,
          lastFetchedAt: new Date(),
          isLoading,
          isFetching,
          isError,
          error,
        }),
      );
    }
  }, [data, poolId, chainId, isLoading, isFetching, isError, error]);

  const poolData = poolUUID ? poolsData[poolUUID] || null : null;

  return { poolData, refetch };
};