import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { IconLabel } from "@/components/IconLabel";
import { ProjectBanner } from "@/components/project/components/ProjectBanner/ProjectBanner";
import { ProjectSummary } from "@/components/project/components/ProjectSummary/ProjectSummary";
import { capitalizeWord } from "@/lib/utils";
import { Badge } from "@/primitives/Badge/Badge";
import { Button } from "@/primitives/Button";

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
  if (!data)
    return (
      <div className="leading-7">
        This application is still pending evaluation submission. Check back here soon for your
        results!
      </div>
    );

  const project = data?.application.metadata.application.project;
  project.recipient = data?.application.metadata.application.recipient;

  const reviewStatusBadgeVariant =
    data?.application.status === "APPROVED"
      ? "success-strong"
      : data?.application.status === "REJECTED"
        ? "error-strong"
        : "info-strong";

  return (
    <div className="flex flex-col gap-6">
      <ProjectBanner
        bannerImg={project.bannerImg ?? ""}
        logoImg={project.logoImg ?? ""}
        avatarPosition="left"
      />
      <div className="flex justify-between">
        <h1 className="text-3xl font-medium leading-9">{project.title}</h1>
        <div className="flex gap-4">
          <Button variant="outlined-secondary" value="Share" /> // TODO
          <Button variant="outlined-secondary" value="View Public Page" />
          {/* `www.explorer.gitcoin.co/#/round/${chainId}/${roundId}/${applicationId} */}
        </div>
      </div>

      <div className="h-0.5 bg-[#EAEAEA]" />

      <div className="flex gap-2">
        <Badge className="font-semibold" variant={reviewStatusBadgeVariant}>
          {capitalizeWord(data?.application.status)}
        </Badge>
      </div>

      <ProjectSummary projectMetadata={project} />

      <div className="h-0.5 bg-[#EAEAEA]" />

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
