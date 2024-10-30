import type { Meta, StoryObj } from "@storybook/react";

import { StatCardGroup } from "./StatCardGroup";

const meta = {
  title: "Primitives/StatCardGroup",
  component: StatCardGroup,
  args: {
    stats: [
      { label: "Application approved", value: "10" },
      { label: "Application rejected", value: "10" },
    ],
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof StatCardGroup>;

export const Default: Story = {};

export const withThreeCard: Story = {
  args: {
    stats: [
      { label: "Application approved", value: "10" },
      { label: "Application rejected", value: "10" },
      { label: "Applications rejected", value: "30" },
    ],
  },
};

export const withFourCard: Story = {
  args: {
    stats: [
      { label: "Applications pending", value: "10" },
      { label: "Applications approved", value: "60" },
      { label: "Applications rejected", value: "30" },
      { label: "Total applications", value: "100" },
    ],
  },
};

export const withFiveCard: Story = {
  args: {
    stats: [
      { label: "Applications pending", value: "10" },
      { label: "Applications approved", value: "60" },
      { label: "Applications rejected", value: "30" },
      { label: "Total applications", value: "100" },
      { label: "Review Pending", value: "40" },
    ],
  },
};
