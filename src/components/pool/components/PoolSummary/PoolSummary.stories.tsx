import type { Meta, StoryObj } from "@storybook/react";

import { PoolSummary, PoolSummaryProps } from "./PoolSummary";

const meta: Meta<PoolSummaryProps> = {
  title: "Components/pool/PoolSummary",
  component: PoolSummary,
  args: {
    chainId: 1,
    name: "Beta Round",
    poolId: "1",
    strategyName: "allov2.DonationVotingMerkleDistributionDirectTransferStrategy",
    applicationsStartTime: new Date().toISOString(),
    applicationsEndTime: new Date(Date.now() + 86400000).toISOString(),
    donationsStartTime: new Date().toISOString(),
    donationsEndTime: new Date().toISOString(),
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof PoolSummary>;

export const Default: Story = {};
