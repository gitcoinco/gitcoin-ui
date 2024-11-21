import type { Meta, StoryObj } from "@storybook/react";

import { ProjectLabelList } from "./ProjectLabelList";

const meta: Meta<typeof ProjectLabelList> = {
  component: ProjectLabelList,
  title: "Components/project/ProjectLabelList",
};

export default meta;
type Story = StoryObj<typeof ProjectLabelList>;

export const Default: Story = {
  args: {
    description: "An onchain project that is very cool. Did I mention that it was cool?",
    socialLinks: [
      {
        link: "https://twitter.com/user",
        platform: "twitter",
      },
      {
        link: "https://github.com/user",
        platform: "github",
        isVerified: true,
      },
    ],
    address: "coolproject.eth",
    dateInfo: {
      date: new Date("2024-11-21T12:14:34.603Z"),
      prefix: "Applied on:",
    },
  },
};
