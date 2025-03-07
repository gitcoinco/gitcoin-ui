import { UseQueryResult } from "@tanstack/react-query";

export const createQueryState = <T>(
  state: "loading" | "pending" | "error" | "success",
  data?: T,
  error?: Error,
): UseQueryResult<T, Error> => {
  switch (state) {
    case "loading":
      return {
        status: "pending" as const,
        data: undefined,
        error: null,
        isLoading: true,
        isFetching: true,
        isPending: true,
        isSuccess: false,
        isError: false,
        isLoadingError: false,
        isRefetchError: false,
        dataUpdatedAt: 0,
        errorUpdatedAt: 0,
        failureCount: 0,
        failureReason: null,
        errorUpdateCount: 0,
        isFetched: false,
        isRefetching: false,
        isStale: false,
        isFetchedAfterMount: false,
        isInitialLoading: true,
        isPaused: false,
        isPlaceholderData: false,
        fetchStatus: "idle" as const,
        refetch: () => Promise.resolve(createQueryState("loading") as UseQueryResult<T, Error>),
        promise: Promise.resolve(undefined as T),
      };
    case "pending":
      return {
        status: "pending" as const,
        data: undefined,
        error: null,
        isLoading: false,
        isFetching: false,
        isPending: true,
        isSuccess: false,
        isError: false,
        isLoadingError: false,
        isRefetchError: false,
        dataUpdatedAt: 0,
        errorUpdatedAt: 0,
        failureCount: 0,
        failureReason: null,
        errorUpdateCount: 0,
        isFetched: true,
        isRefetching: false,
        isStale: false,
        isFetchedAfterMount: true,
        isInitialLoading: false,
        isPaused: false,
        isPlaceholderData: false,
        fetchStatus: "idle" as const,
        refetch: () => Promise.resolve(createQueryState("pending")),
        promise: Promise.resolve(data as T),
      };
    case "error":
      return {
        status: "error" as const,
        data: undefined,
        error: error || new Error("An error occurred"),
        isLoading: false,
        isFetching: false,
        isPending: false,
        isSuccess: false,
        isError: true,
        isLoadingError: true,
        isRefetchError: false,
        dataUpdatedAt: 0,
        errorUpdatedAt: 0,
        failureCount: 0,
        failureReason: null,
        errorUpdateCount: 0,
        isFetched: true,
        isRefetching: false,
        isStale: false,
        isFetchedAfterMount: true,
        isInitialLoading: false,
        isPaused: false,
        isPlaceholderData: false,
        fetchStatus: "idle" as const,
        refetch: () => Promise.resolve(createQueryState<T>("error", undefined, error)),
        promise: Promise.resolve(undefined as T),
      };
    case "success":
      return {
        status: "success" as const,
        data: data as T,
        error: null,
        isLoading: false,
        isFetching: false,
        isPending: false,
        isSuccess: true,
        isError: false,
        isLoadingError: false,
        isRefetchError: false,
        dataUpdatedAt: 0,
        errorUpdatedAt: 0,
        failureCount: 0,
        failureReason: null,
        errorUpdateCount: 0,
        isFetched: true,
        isRefetching: false,
        isStale: false,
        isFetchedAfterMount: true,
        isInitialLoading: false,
        isPaused: false,
        isPlaceholderData: false,
        fetchStatus: "idle" as const,
        refetch: () => Promise.resolve(createQueryState("success", data)),
        promise: Promise.resolve(data as T),
      };
    default:
      throw new Error("Invalid state");
  }
};
