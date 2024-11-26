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
    registerStartDate: new Date(),
    registerEndDate: new Date(Date.now() + 86400000),
    allocationStartDate: new Date(),
    allocationEndDate: new Date(),
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof PoolSummary>;

export const Default: Story = {};
