import React from "react";
import { Card, CardContent } from "@/ui-shadcn/card";

import { Project } from "@/features/project/types/types";
import { BannerImage } from "@/primitives/BannerImage";
import { Avatar } from "@/primitives/Avatar";
import { Skeleton } from "@/ui-shadcn/skeleton";

interface ProjectCardProps {
  project?: Project | undefined;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return project === undefined ? <LoadingCard /> : <DataCard project={project} />;
}

function LoadingCard() {
  return (
    <Card className="ui-block ui-max-w-sm ui-overflow-hidden">
      <div className="ui-relative">
        <Skeleton className="ui-h-[120px] ui-w-full ui-rounded-md ui-bg-neutral-300" />
      </div>
      <CardContent className="ui-pt-12 ui-text-center">
        <Skeleton className="ui-mb-2 ui-h-10 ui-w-full ui-rounded-md" />
        <Skeleton className="ui-h-24 ui-w-full ui-rounded-md" />
      </CardContent>
    </Card>
  );
}

export function DataCard({ project }: ProjectCardProps) {
  return (
    <Card className="ui-block ui-max-w-sm ui-overflow-hidden">
      <div className="ui-relative">
        <BannerImage ipfsCID={project?.metadata?.bannerImg} />
        <div className="ui-absolute ui-bottom-0 ui-left-1/2 ui--translate-x-1/2 ui-translate-y-1/2">
          <Avatar ipfsCID={project?.metadata?.logoImg} size={60} />
        </div>
      </div>
      <CardContent className="ui-pt-12">
        <h2 className="ui-mb-2 ui-font-sans ui-text-2xl ui-font-bold">
          {project?.metadata?.title}
        </h2>
        <p className="ui-line-clamp-4 ui-font-sans ui-text-grey-400">
          {project?.metadata?.description}
        </p>
      </CardContent>
    </Card>
  );
}
