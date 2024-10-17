import type { Meta, StoryObj } from "@storybook/react";

import BannerImage from "./BannerImage";

const meta: Meta<typeof BannerImage> = {
  component: BannerImage,
};

export default meta;
type Story = StoryObj<typeof BannerImage>;

const randomBannerCid = "bafkreibq4csiakc32qikp5tjf4sutnvcy6mligx346g7eogi2n5uvwipue";

export const Primary: Story = {
  args: {
    ipfsCID: randomBannerCid,
  },
};
