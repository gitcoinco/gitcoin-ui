import { UseQueryResult } from "@tanstack/react-query";

import { Project } from "../types/types";

export const singleProject: Project = {
  id: "0x00065ad5b4ac5b42ac82c60ac9e939505f7996e95b6181919a5353fc50e6b664",
  metadata: {
    title: "Gitcoin Grants Stack",
    logoImg: "QmVSEo7Q1NFok7AT3vqD55EoThBgujoF1KXhiph9T9MNTr",
    bannerImg: "QmXE6wP4Zsqp6VdNtXjv2EwqJpCTcBZfZNdSKSbjzEKKtn",
    description:
      "Gitcoin Grants Stack is a protocol-enabled solution that enables any community to easily create, manage and grow a grants program. From deployment and application management, to funds allocation, Grants Stack takes the hassle out of running a grants program.",
    projectGithub: "",
    projectTwitter: "",
  },
};

export const QueryPending: UseQueryResult<Project, Error> = {
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
  refetch: () => Promise.resolve(QueryPending),
  promise: Promise.resolve(singleProject),
};

export const QueryError: UseQueryResult<Project, Error> = {
  status: "error" as const,
  data: undefined,
  error: new Error("uh oh"),
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
  refetch: () => Promise.resolve(QueryPending),
  promise: Promise.resolve(singleProject),
};

export const QuerySuccess: UseQueryResult<Project, Error> = {
  status: "success" as const,
  data: singleProject,
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
  refetch: () => Promise.resolve(QueryPending),
  promise: Promise.resolve(singleProject),
};
