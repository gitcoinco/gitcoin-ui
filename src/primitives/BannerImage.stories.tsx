import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";

import { BannerImage } from "./BannerImage";

const meta: Meta<typeof BannerImage> = {
  component: BannerImage,
};

export default meta;
type Story = StoryObj<typeof BannerImage>;

const gitcoinBannerCID = "QmXE6wP4Zsqp6VdNtXjv2EwqJpCTcBZfZNdSKSbjzEKKtn";

const gitcoinBannerURL = "https://ipfs.io/ipfs/QmXE6wP4Zsqp6VdNtXjv2EwqJpCTcBZfZNdSKSbjzEKKtn";

export const sourceFromIPFS: Story = {
  args: {
    ipfsCID: gitcoinBannerCID,
    size: 350,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const image = await canvas.findByAltText("banner");
    const src = image.getAttribute("src");
    expect(src).toContain(gitcoinBannerCID);
  },
};

export const sourceFromURL: Story = {
  args: {
    url: gitcoinBannerURL,
    size: 350,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const image = await canvas.findByAltText("banner");
    expect(image).toHaveAttribute("src", gitcoinBannerURL);
  },
};

export const MissingEverything: Story = {
  args: {
    size: 350,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const image = await canvas.findByAltText("banner");
    const src = image.getAttribute("src");
    expect(src).toContain("default");
  },
};

export const AllProvided: Story = {
  args: {
    url: gitcoinBannerURL,
    ipfsCID: gitcoinBannerCID,
    size: 350,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const image = await canvas.findByAltText("banner");
    const src = image.getAttribute("src");
    expect(src).toContain(gitcoinBannerCID);
  },
};

export const FullScreen: Story = {
  args: {
    ipfsCID: gitcoinBannerCID,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const image = await canvas.findByAltText("banner");
    expect(image).toHaveStyle("width: 1248px");
  },
};

export const Small: Story = {
  args: {
    ipfsCID: gitcoinBannerCID,
    size: 100,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const image = await canvas.findByAltText("banner");
    expect(image).toHaveStyle("width: 100px");
  },
};
