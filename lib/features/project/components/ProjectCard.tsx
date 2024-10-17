import React from "react";

import { Card, CardContent } from "@/primitives/shadcn/ui/card";
import { Project } from "@/types/types";
import BannerImage from "@/primitives/BannerImage";
import ProfileImage from "@/primitives/ProfileImage";
import { Skeleton } from "@/primitives/shadcn/ui/skeleton";

type ProjectCardProps = {
  project?: Project | undefined;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return project === undefined ? <LoadingCard /> : <DataCard project={project} />;
}

function LoadingCard() {
  return (
    <Card className="block max-w-sm overflow-hidden">
      <div className="relative">
        <Skeleton className="h-[150px] w-full rounded-md" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
          <Skeleton className="size-[60px] rounded-full" />
        </div>
      </div>
      <CardContent className="pt-16 text-center">
        <Skeleton className="mb-2 h-10 w-full rounded-md" />
        <Skeleton className="h-24 w-full rounded-md" />
      </CardContent>
    </Card>
  );
}

export function DataCard({ project }: ProjectCardProps) {
  return (
    <Card className="block max-w-sm overflow-hidden">
      <div className="relative">
        <BannerImage ipfsCID={project?.metadata?.bannerImg} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
          <ProfileImage ipfsCID={project?.metadata?.logoImg} />
        </div>
      </div>
      <CardContent className="pt-16 text-center">
        <h2 className="mb-2 text-2xl font-bold">{project?.metadata?.title}</h2>
        <p className="line-clamp-4 text-muted-foreground">{project?.metadata?.description}</p>
      </CardContent>
    </Card>
  );
}

{
  /* <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
<p class="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
</a> */
}
