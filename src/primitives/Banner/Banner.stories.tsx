import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";

import { Banner } from "./Banner";

const meta: Meta<typeof Banner> = {
  component: Banner,
};

export default meta;
type Story = StoryObj<typeof Banner>;

const gitcoinBannerCID = "QmXE6wP4Zsqp6VdNtXjv2EwqJpCTcBZfZNdSKSbjzEKKtn";

const gitcoinBannerURL = "https://ipfs.io/ipfs/QmXE6wP4Zsqp6VdNtXjv2EwqJpCTcBZfZNdSKSbjzEKKtn";

export const sourceFromIPFS: Story = {
  args: {
    ipfsCID: gitcoinBannerCID,
    height: 10,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const image = await canvas.findByAltText("Banner");
    const src = image.getAttribute("src");
    expect(src).toContain(gitcoinBannerCID);
  },
};

export const sourceFromURL: Story = {
  args: {
    url: gitcoinBannerURL,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const image = await canvas.findByAltText("Banner");
    expect(image).toHaveAttribute("src", gitcoinBannerURL);
  },
};

export const MissingEverything: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const image = await canvas.findByAltText("Banner");
    const src = image.getAttribute("src");
    expect(src).toContain("default");
  },
};

export const AllProvided: Story = {
  args: {
    url: gitcoinBannerURL,
    ipfsCID: gitcoinBannerCID,
    fallbackName: "Gitcoin Labs",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const image = await canvas.findByAltText("Banner");
    const src = image.getAttribute("src");
    expect(src).toContain(gitcoinBannerCID);
  },
};

export const Big: Story = {
  args: {
    ipfsCID: gitcoinBannerCID,
    size: 200,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const Banner = canvas.getByRole("presentation");
    expect(Banner).toHaveStyle("width: 200px");
    expect(Banner).toHaveStyle("height: 200px");
  },
};
