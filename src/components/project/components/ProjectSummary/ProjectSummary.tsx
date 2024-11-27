import * as React from "react";

import { IconLabel } from "@/components/IconLabel";
import { ProjectMetadata } from "@/features/checker/services/allo";
import { IconType } from "@/primitives/Icon";

export interface ProjectSummaryProps {
  projectMetadata: ProjectMetadata;
}

export const ProjectSummary: React.FC<ProjectSummaryProps> = ({ projectMetadata }) => {
  const { recipient, createdAt, website, lastUpdated, projectTwitter, projectGithub } =
    projectMetadata;

  const appliedOnLabel = `Applied on: ${new Date(createdAt).toLocaleString()}`;
  const lastEditedLabel = `Last edited: ${new Date(
    lastUpdated.toString() !== "0" ? lastUpdated : createdAt,
  ).toLocaleString()}`;

  return (
    <div className="flex gap-16">
      <div className="flex flex-col gap-4">
        {recipient && <IconLabel type="address" address={recipient} />}
        {website && <IconLabel type="social" platform="website" link={website} />}
        {projectTwitter && (
          <IconLabel type="social" platform="twitter" link={`https://x.com/${projectTwitter}`} />
        )}
      </div>
      <div className="flex flex-col gap-4">
        {createdAt && (
          <IconLabel
            className="text-gray-700"
            type="default"
            iconType={IconType.CALENDAR}
            label={appliedOnLabel}
          />
        )}
        {(createdAt || lastUpdated) && (
          <IconLabel
            className="text-gray-700"
            type="default"
            iconType={IconType.CALENDAR}
            label={lastEditedLabel}
          />
        )}
        {projectGithub && (
          <IconLabel type="social" platform="github" link={`https://github.com/${projectGithub}`} />
        )}
      </div>
    </div>
  );
};
