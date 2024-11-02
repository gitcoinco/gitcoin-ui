import { Meta, StoryObj } from "@storybook/react";

import { RoundStatusBadge, RoundStatus } from "./RoundStatusBadge";

const meta: Meta<typeof RoundStatusBadge> = {
  title: "Components/RoundStatusBadge",
  component: RoundStatusBadge,
  argTypes: {
    roundStatus: {
      control: "select",
      options: Object.values(RoundStatus),
    },
  },
} satisfies Meta<typeof RoundStatusBadge>;

export default meta;

type Story = StoryObj<typeof RoundStatusBadge>;

export const PreRound: Story = {
  args: {
    roundStatus: RoundStatus.PreRound,
  },
} satisfies Story;
export const RoundInProgress: Story = {
  args: {
    roundStatus: RoundStatus.RoundInProgress,
  },
} satisfies Story;

export const ApplicationsInProgress: Story = {
  args: {
    roundStatus: RoundStatus.ApplicationsInProgress,
  },
} satisfies Story;

export const FundingPending: Story = {
  args: {
    roundStatus: RoundStatus.FundingPending,
  },
} satisfies Story;
