import type { Meta, StoryObj } from "@storybook/react";

import ReviewSummary from "./ReviewSummary";

const meta: Meta<typeof ReviewSummary> = {
  component: ReviewSummary,
  title: "Features/Checker/Components/ReviewSummary", // Adjust the path as per your Storybook organization
} satisfies Meta<typeof ReviewSummary>;

export default meta;

type Story = StoryObj<typeof ReviewSummary>;

export const Default: Story = {
  args: null,
};
