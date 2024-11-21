import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ProjectBanner } from "@/components/project/components/ProjectBanner/ProjectBanner";

import ReviewDropdownList from "../../components/ReviewDropdownList/ReviewDropdownList";
import { useApplicationEvaluations } from "../../hooks/useApplication";

export interface ViewApplicationEvaluationsPageProps {
  chainId: number;
  roundId: string;
  applicationId: string;
}

const ApplicationEvaluationsContent: React.FC<ViewApplicationEvaluationsPageProps> = ({
  chainId,
  roundId,
  applicationId,
}) => {
  const { data, isLoading, error } = useApplicationEvaluations(chainId, roundId, applicationId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading evaluations</div>;
  if (!data) return <div>No data</div>;
  return (
    <div>
      <ProjectBanner
        bannerImg={data?.application.metadata.application.project.bannerImg ?? ""}
        logoImg={data?.application.metadata.application.project.logoImg ?? ""}
        avatarPosition="left"
      />

      <ReviewDropdownList evaluations={data?.applicationEvaluations} />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export const ViewApplicationEvaluationsPage: React.FC<ViewApplicationEvaluationsPageProps> = ({
  chainId,
  roundId,
  applicationId,
}) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <ApplicationEvaluationsContent
        chainId={chainId}
        roundId={roundId}
        applicationId={applicationId}
      />
    </QueryClientProvider>
  );
};
