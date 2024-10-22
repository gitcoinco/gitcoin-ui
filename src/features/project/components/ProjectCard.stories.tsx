import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";

import { ProjectCard } from "./ProjectCard";
import { QueryError, QueryPending, QuerySuccess, singleProject } from "../mocks/objects";

const meta: Meta<typeof ProjectCard> = {
  title: "Components/Project/ProjectCard",
  component: ProjectCard,
};

export default meta;
type Story = StoryObj<typeof ProjectCard>;

export const Default: Story = {
  args: {
    project: singleProject,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const avatar = await canvas.findByAltText("avatar");
    let src = avatar.getAttribute("src");
    expect(src).toContain(singleProject.metadata.logoImg);

    const banner = await canvas.findByAltText("banner");
    src = banner.getAttribute("src");

    expect(src).toContain(singleProject.metadata.bannerImg);
  },
};

export const Undefined: Story = {
  args: {
    project: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const card = canvas.getByRole("presentation");
    expect(card).toBeVisible();

    const avatarElement = canvas.queryAllByAltText("avatar");
    expect(avatarElement).toHaveLength(0);

    const bannerElement = canvas.queryAllByAltText("banner");
    expect(bannerElement).toHaveLength(0);
  },
};

export const SuccessQuery: Story = {
  args: {
    queryResult: QuerySuccess,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const avatar = await canvas.findByAltText("avatar");
    let src = avatar.getAttribute("src");
    expect(src).toContain(singleProject.metadata.logoImg);

    const banner = await canvas.findByAltText("banner");
    src = banner.getAttribute("src");

    expect(src).toContain(singleProject.metadata.bannerImg);
  },
};

export const PendingQuery: Story = {
  args: {
    queryResult: QueryPending,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const card = canvas.getByRole("presentation");
    expect(card).toBeVisible();

    const avatarElement = canvas.queryAllByAltText("avatar");
    expect(avatarElement).toHaveLength(0);

    const bannerElement = canvas.queryAllByAltText("banner");
    expect(bannerElement).toHaveLength(0);
  },
};

export const ErroryQuery: Story = {
  args: {
    queryResult: QueryError,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const avatarElement = canvas.queryByAltText("avatar");
    expect(avatarElement).toBeNull();

    const bannerElement = canvas.queryByAltText("banner");
    expect(bannerElement).toBeNull();
  },
};
