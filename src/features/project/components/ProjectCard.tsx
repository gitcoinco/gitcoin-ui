import React from "react";

import { UseQueryResult } from "@tanstack/react-query";
import { match, P } from "ts-pattern";

import { Project } from "@/features/project/types/types";
import { Avatar } from "@/primitives/Avatar";
import { BannerImage } from "@/primitives/BannerImage";
import { Card, CardContent } from "@/ui-shadcn/card";
import { Skeleton } from "@/ui-shadcn/skeleton";

interface ProjectCardProps {
  project?: Project | undefined;
  queryResult?: UseQueryResult<Project, Error> | undefined;
}

interface ErrorCardProps {
  error?: Error | null | undefined;
}

export function ProjectCard({ project, queryResult }: ProjectCardProps) {
  return (
    match({ project, queryResult })
      // everything is nullish
      .with({ project: P.nullish, queryResult: P.nullish }, () => <LoadingCard />)
      // Project is explicitly passed in
      .with({ project: P.any, queryResult: P.nullish }, () => <DataCard project={project} />)
      // TanStack Query result is passed in and it's an error
      .with({ project: P.nullish, queryResult: { status: "error" } }, (match) => (
        <ErrorCard error={match.queryResult?.error} />
      ))
      // TanStack Query result is passed in and it's pending
      .with({ project: P.nullish, queryResult: { status: "pending" } }, () => <LoadingCard />)
      // TanStack Query result is passed in and it's a success
      .with({ project: P.nullish, queryResult: { status: "success" } }, (match) => (
        <DataCard project={match.queryResult?.data} />
      ))
      .otherwise(() => <ErrorCard />)
  );
}

function LoadingCard() {
  return (
    <Card className="block max-w-sm overflow-hidden" role="presentation">
      <div className="relative">
        <Skeleton className="h-[120px] w-full rounded-md bg-neutral-300" />
      </div>
      <CardContent className="pt-12 text-center">
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
          <Avatar ipfsCID={project?.metadata?.logoImg} size={60} />
        </div>
      </div>
      <CardContent className="pt-12">
        <h2 className="mb-2 font-sans text-2xl font-bold">{project?.metadata?.title}</h2>
        <p className="line-clamp-4 font-sans text-grey-400">{project?.metadata?.description}</p>
      </CardContent>
    </Card>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ErrorCard({ error }: ErrorCardProps) {
  return <></>;
}
