import React from "react";

import { ProjectBanner } from "@/components/project/components/ProjectBanner/ProjectBanner";
import { ProjectSummary } from "@/components/project/components/ProjectSummary/ProjectSummary";
import { useToast } from "@/hooks/use-toast";
import { capitalizeWord } from "@/lib/utils";
import { Badge } from "@/primitives/Badge/Badge";
import { Button } from "@/primitives/Button";
import { Icon, IconType } from "@/primitives/Icon";

import { ReviewDropdownList } from "~checker/components";
import { useApplicationEvaluations } from "~checker/hooks";

export interface ViewApplicationEvaluationsPageProps {
  chainId: number;
  poolId: string;
  applicationId: string;
}

export const ViewApplicationEvaluationsPage: React.FC<ViewApplicationEvaluationsPageProps> = ({
  chainId,
  poolId,
  applicationId,
}) => {
  const { toast } = useToast();
  const { data, isLoading, error } = useApplicationEvaluations(chainId, poolId, applicationId);

  if (isLoading) return;
  if (error) return <div>Error loading evaluations</div>;
  if (!data) return;

  const project = data?.application.metadata.application.project;
  project.recipient = data?.application.metadata.application.recipient;

  const reviewStatusBadgeVariant =
    data?.application.status === "APPROVED"
      ? "success-strong"
      : data?.application.status === "REJECTED"
        ? "error-strong"
        : "info-strong";

  return (
    <div className="mx-auto flex max-w-[1440px] flex-col  gap-4 px-20">
      <ProjectBanner
        bannerImg={project.bannerImg ?? ""}
        logoImg={project.logoImg ?? ""}
        avatarPosition="left"
      />
      <div className="flex justify-between">
        <h1 className="text-3xl font-medium leading-9">{project.title}</h1>
        <div className="flex gap-4">
          <Button
            variant="outlined-secondary"
            className="h-10 w-24 border-grey-100"
            icon={<Icon type={IconType.LINK} className="fill-black" />}
            onClick={() => {
              const url = `https://beta.checker.gitcoin.co/#/${chainId}/${poolId}/${applicationId}`;
              navigator.clipboard.writeText(url).then(
                () => {
                  toast({
                    status: "success",
                    description: "Successfully copied to clipboard",
                  });
                },
                (err) => {
                  console.error("Failed to copy: ", err);
                },
              );
            }}
            value="Share"
          />
          <div className="rainbow-button flex items-center">
            <Button
              value="View public page"
              variant="none"
              className=" h-[38px] w-40 rounded-lg border-none bg-white font-mono text-black"
              onClick={() => {
                window.open(
                  `https://explorer.gitcoin.co/#/round/${chainId}/${poolId}/${applicationId}`,
                  "_blank",
                );
              }}
            />
          </div>
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
      {data?.applicationEvaluations.length > 0 ? (
        <ReviewDropdownList evaluations={data?.applicationEvaluations} />
      ) : (
        <div className="leading-7">
          This application is still pending evaluation submission. Check back here soon for your
          results!
        </div>
      )}
    </div>
  );
};
