import { UseQueryResult } from "@tanstack/react-query";

export type ProjectCardDataProps = {
  id: string;
  title: string;
  logoImg?: string;
  bannerImg?: string;
  description?: string;
  projectGithub?: string;
  projectTwitter?: string;
};

type QueryProps = {
  queryResult: UseQueryResult<ProjectCardDataProps, Error>;
};

export type ProjectCardProps = ProjectCardDataProps | QueryProps;
