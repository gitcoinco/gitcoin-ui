import type { Meta, StoryObj } from "@storybook/react";

import { ProjectReviewList } from "./ProjectReviewList";
import { mockProjectReviews } from "./mocks";

const meta = {
  title: "Features/Checker/ProjectReviewList",
  component: ProjectReviewList,
  args: {
    reviewer: "0x1234567890123456789012345678901234567890",
    projects: mockProjectReviews,
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof ProjectReviewList>;

export const Default: Story = {};
