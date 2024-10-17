import React from "react";
// import { Button } from "@/primitives/shadcn/ui/button";
import { Card, CardContent } from "@/primitives/shadcn/ui/card";
import { Project } from "@/types/types";
// import Image from "next/image";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="w-[350px] overflow-hidden">
      <div className="relative">
        <img
          // src="/placeholder.svg?height=150&width=350"
          src={
            project?.metadata?.bannerImg
              ? "https://ipfs.io/ipfs/" + project.metadata.bannerImg
              : "https://placehold.co/300x100"
          }
          // width={350}
          // height={50}
          alt="Banner"
          className="h-[150px] w-full object-cover"
        />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 transform">
          <img
            src={
              project?.metadata?.logoImg
                ? "https://ipfs.io/ipfs/" + project.metadata.logoImg
                : "https://placehold.co/300x100"
            }
            // width={60}
            // height={60}
            alt="Profile"
            className="h-[60px] w-[60px] rounded-full border-4 border-white"
          />
        </div>
      </div>
      <CardContent className="pt-16 text-center">
        <h2 className="mb-2 text-2xl font-bold">{project?.metadata?.title}</h2>
        <p className="text-muted-foreground line-clamp-2">{project?.metadata?.description}</p>
      </CardContent>
    </Card>
  );
}
