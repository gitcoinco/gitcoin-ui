import { Meta, StoryObj } from "@storybook/react";

import { RoundTypeBadge, RoundType } from "./RoundTypeBadge";

const meta: Meta<typeof RoundTypeBadge> = {
  title: "Components/RoundTypeBadge",
  component: RoundTypeBadge,
  argTypes: {
    roundType: {
      control: "select",
      options: Object.values(RoundType),
    },
  },
} satisfies Meta<typeof RoundTypeBadge>;

export default meta;

type Story = StoryObj<typeof RoundTypeBadge>;

export const QuadraticFunding: Story = {
  args: {
    roundType: RoundType.QuadraticFunding,
  },
} satisfies Story;
export const DirectGrants: Story = {
  args: {
    roundType: RoundType.DirectGrants,
  },
} satisfies Story;
