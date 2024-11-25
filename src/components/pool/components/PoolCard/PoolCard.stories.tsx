import { Meta, StoryObj } from "@storybook/react";

import { PoolStatus, PoolType } from "@/components/Badges";
import { PoolCardProps } from "@/components/pool/types/types";
import { createQueryState } from "@/lib/tanstack/queryResults";

import { PoolCard } from "./PoolCard";

const simpleRound = {
  roundName: "Round Card",
  roundId: "90",
  chainId: 8453,
  roundType: PoolType.QuadraticFunding,
  startDate: new Date(),
  endDate: new Date(),
  poolStatus: PoolStatus.ApplicationsInProgress,
  redirectLink: "https://explorer.gitcoin.co/#/round/{chainId}/{roundId}",
  redirect: true,
};

export default {
  title: "Components/pool/PoolCard",
  component: PoolCard,
  argTypes: {
    roundName: { control: "text" },
    roundId: { control: "text" },
    chainId: { control: "number" },
    roundType: { control: "select", options: Object.values(PoolType) },
    poolStatus: { control: "select", options: Object.values(PoolStatus) },
    startDate: { control: "date" },
    endDate: { control: "date" },
    queryResult: { table: { disable: true } }, // Hide queryResult from controls
  },
} as Meta<typeof PoolCard>;

type Story = StoryObj<PoolCardProps>;

export const Default: Story = {
  args: {
    ...simpleRound,
  },
};

export const Loading: Story = {
  args: {
    queryResult: createQueryState("pending"),
  },
};

export const Success: Story = {
  args: {
    queryResult: createQueryState("success", {
      ...simpleRound,
    }),
  },
};
