import { Meta, StoryObj } from "@storybook/react";

import { ProjectCardDataProps, ProjectCardProps } from "@/components/project/types/types";
import { createQueryState } from "@/lib/tanstack/queryResults";

import { ProjectCard } from "./ProjectCard";

const simpleProject = {
  id: "0x123456789",
  title: "Gitcoin Grants Stack",
  logoImg: "QmVSEo7Q1NFok7AT3vqD55EoThBgujoF1KXhiph9T9MNTr",
  bannerImg: "QmXE6wP4Zsqp6VdNtXjv2EwqJpCTcBZfZNdSKSbjzEKKtn",
  description:
    "Gitcoin Grants Stack is a protocol-enabled solution that enables any community to easily create, manage and grow a grants program.",
  projectGithub: "https://github.com/gitcoinco",
  projectTwitter: "https://twitter.com/gitcoin",
};

export default {
  title: "Components/project/ProjectCard",
  component: ProjectCard,
  argTypes: {
    id: { control: "text" },
    title: { control: "text" },
    logoImg: { control: "text" },
    bannerImg: { control: "text" },
    description: { control: "text" },
    projectGithub: { control: "text" },
    projectTwitter: { control: "text" },
    queryResult: { table: { disable: true } }, // Hide queryResult from controls
  },
} as Meta<typeof ProjectCard>;

type Story = StoryObj<ProjectCardProps>;

export const Default: Story = {
  args: {
    ...simpleProject,
  },
};

export const Loading: Story = {
  args: {
    queryResult: createQueryState("pending"),
  },
};

export const Success: Story = {
  args: {
    queryResult: createQueryState<ProjectCardDataProps>("success", {
      ...simpleProject,
    }),
  },
};

export const Error: Story = {
  args: {
    queryResult: createQueryState<ProjectCardDataProps>("error", undefined),
  },
};