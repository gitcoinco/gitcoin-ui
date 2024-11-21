import React from "react";



import { QueryClient, QueryClientProvider } from "@tanstack/react-query";



import { IconLabel } from "@/components/IconLabel";
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
      <div className="flex flex-col gap-4">
        <span className="font-sans text-[16px]/[24px] font-normal">
          An onchain project that is very cool. Did I mention that it was cool?
        </span>
        <div className="flex flex-wrap items-start gap-10">
          <div className="flex flex-col gap-4">
            <IconLabel ens="coolproject.eth" type="address" />
            <IconLabel link="https://twitter.com/user" platform="website" type="social" />
            <IconLabel
              isVerified
              link="https://twitter.com/useruser"
              platform="twitter"
              type="social"
            />
            <IconLabel isVerified link="https://twitter.com/user" platform="github" type="social" />
          </div>
          <div className="flex flex-col gap-4">
            <IconLabel
              date={new Date("2024-11-21T12:14:34.603Z")}
              prefix="Applied on:"
              type="dateWithPrefix"
            />
            <IconLabel link="https://twitter.com/user" platform="github" type="social" />
          </div>
        </div>
      </div>

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