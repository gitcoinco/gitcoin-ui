import { Avatar } from "@/primitives/Avatar";
import { BannerImage } from "@/primitives/BannerImage";

import { Project } from "./types";

export interface ProjectHeaderProps {
  project: Project;
}

export const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  return (
    <div className="relative ">
      <BannerImage url={project.bannerURL} bannerClassName="rounded-2xl" />
      <div className="absolute bottom-0 left-24 -translate-x-1/2 translate-y-1/2">
        <Avatar
          size={120}
          url={project.avatarURL}
          avatarClassName="rounded-full border-white border-4 bg-grey-100"
        />
      </div>
    </div>
  );
};
