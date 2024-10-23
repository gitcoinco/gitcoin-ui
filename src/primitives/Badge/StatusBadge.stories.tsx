import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";

import { StatusBadge } from "./StatusBadge";

const meta: Meta<typeof StatusBadge> = {
  title: "Primitives/StatusBadge",

  component: StatusBadge,
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const InProgress: Story = {
  args: {
    status: "In Progress",
  },
};

export const Ended: Story = {
  args: {
    status: "Ended",
  },
};
