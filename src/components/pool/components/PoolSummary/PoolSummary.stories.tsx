import type { Meta, StoryObj } from "@storybook/react";

import { PoolType } from "@/components/Badges";

import { PoolSummary } from "./PoolSummary";

const meta: Meta<typeof PoolSummary> = {
  component: PoolSummary,
  title: "Components/pool/PoolSummary",
} satisfies Meta<typeof PoolSummary>;

export default meta;

type Story = StoryObj<typeof PoolSummary>;

export const Default: Story = {
  args: {
    chainId: 8453,
    poolId: "90",
    strategy: PoolType.QuadraticFunding,
    name: "Pool Summary",
    registerStartDate: new Date(),
    registerEndDate: new Date(),
    allocationStartDate: new Date(),
    allocationEndDate: new Date(),
  },
};
