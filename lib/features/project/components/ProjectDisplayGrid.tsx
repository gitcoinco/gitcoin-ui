"use client";

import React from "react";
// import Link from "next/link";

import { useProjects } from "@/features/project/hooks/useProjects";
import ProjectCard from "@/features/project/components/ProjectCard";
import { Project } from "@/types/types";

type Props = {
  query: string;
};

export default function ProjectDisplayGrid(props: Props) {
  // const rounds = useRounds(props.query);
  const { data: projects, isPending, isError, isSuccess } = useProjects(props.query);

  function getProjects() {
    if (isSuccess) {
      return projects;
    }

    return new Array(6).fill(undefined);
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {getProjects().map((object: Project | undefined, i: number) => {
        return (
          // <Link key={i} href={`/project/${object.chainId}/${object.id}`}>
          <ProjectCard project={object} key={i} />
          // </Link>
        );
      })}
    </div>
  );
}
