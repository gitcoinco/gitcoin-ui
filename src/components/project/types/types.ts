import { UseQueryResult } from "@tanstack/react-query";

export interface ProjectData {
  id: string;
  title: string;
  logoImg?: string;
  bannerImg?: string;
  description?: string;
  projectGithub?: string;
  projectTwitter?: string;
}
