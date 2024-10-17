import type { Meta, StoryObj } from "@storybook/react";

import ProfileImage from "./ProfileImage";

const meta: Meta<typeof ProfileImage> = {
  component: ProfileImage,
};

export default meta;
type Story = StoryObj<typeof ProfileImage>;

const randomProfileCid = "bafkreibtv77vq52oynon2bommgsnimmq7ex6wgumfichfisgj3hezhoppq";

export const Primary: Story = {
  args: {
    ipfsCID: randomProfileCid,
  },
};
