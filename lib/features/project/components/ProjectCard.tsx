import React from "react";
// import { Button } from "@/primitives/shadcn/ui/button";
import { Card, CardContent } from "@/primitives/shadcn/ui/card";
import { Project } from "@/types/types";
import BannerImage from "@/primitives/BannerImage";
import ProfileImage from "@/primitives/ProfileImage";
import { Skeleton } from "@/primitives/shadcn/ui/skeleton";
// import Image from "next/image";

type ProjectCardProps = {
  project?: Project | undefined;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return project === undefined ? <LoadingCard /> : <DataCard project={project} />;
}

function LoadingCard() {
  return (
    <Card className="h-96 w-[350px] overflow-hidden">
      <div className="relative">
        {/* <Skeleton className="h-[150px] w-full rounded-md" /> */}
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
    <Card className="h-96 w-[350px] overflow-hidden">
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
