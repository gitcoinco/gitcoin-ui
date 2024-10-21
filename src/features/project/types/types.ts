export interface Project {
  id: string;
  name: string;
  description?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  anchorAddress: string;
  chainId: number;
  metadata: ProjectMetadata;
}

export interface ProjectMetadata {
  title: string | undefined;
  logoImg: string | undefined;
  bannerImg: string | undefined;
  description: string | undefined;
  projectGithub: string | undefined;
  projectTwitter: string | undefined;
}
