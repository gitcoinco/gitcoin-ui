import React from "react";
import { Card, CardContent } from "@/ui-shadcn/card";
import { match, P } from "ts-pattern";
import { UseQueryResult } from "@tanstack/react-query";

import { Project } from "@/features/project/types/types";
import { BannerImage } from "@/primitives/BannerImage";
import { Avatar } from "@/primitives/Avatar";
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

// export function ProjectCard({ project, queryResult }: ProjectCardProps) {
//     return match({ project, queryResult })
//         // everything is nullish
//         .with({ project: P.nullish, queryResult: P.nullish }, () => <LoadingCard />)
//         // Project is explicitly passed in
//         .with({ project: P.any, queryResult: P.nullish }, () => <DataCard project={project} />)
//         // TanStack Query result is passed in
//         .with({ project: P.nullish, queryResult: P.any }, () => {
//             match(queryResult)
//                 //Tanstack Query result is error
//                 .with({ status: "error" }, (queryResult) => <ErrorCard error={queryResult.error}/>)
//                 //Tanstack Query result is pending
//                 .with({ status: "pending" }, () => <LoadingCard />)
//                 //Tanstack Query result is success
//                 .with({ status: "success" }, (queryResult) => <DataCard project={queryResult.data} />)
//         })
//         .otherwise(() => <ErrorCard />);

// }

function LoadingCard() {
  return (
    <Card className="ui-block ui-max-w-sm ui-overflow-hidden" role="presentation">
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

export function ErrorCard({ error }: ErrorCardProps) {
  return <></>;
}
