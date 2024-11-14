import { Avatar } from "@/primitives/Avatar";
import { BannerImage } from "@/primitives/BannerImage";

import { Project } from "./types";

export interface ProjectHeaderProps {
  project: Project;
}

export const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  return (
    <div className="relative ">
      <BannerImage url={project.bannerUrl} bannerClassName="rounded-2xl" />
      <div className="absolute bottom-0 left-12 -translate-x-1/2 translate-y-1/2 md:left-24">
        <Avatar
          url={project.avatarUrl}
          avatarClassName="rounded-full border-white border-4 bg-grey-100 w-12 md:w-24"
        />
      </div>
    </div>
  );
};
