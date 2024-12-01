import { Meta, StoryObj } from "@storybook/react";

import { PoolCardProps, PoolCardQueryProps } from "@/components";
import { createQueryState } from "@/lib";
import { PoolStatus, PoolType } from "@/types";

import { PoolCard } from "./PoolCard";

const simpleRound = {
  roundName: "Round Card",
  roundId: "90",
  chainId: 8453,
  poolType: PoolType.QuadraticFunding,
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
    poolType: { control: "select", options: Object.values(PoolType) },
    poolStatus: { control: "select", options: Object.values(PoolStatus) },
    startDate: { control: "date" },
    endDate: { control: "date" },
    queryResult: { table: { disable: true } }, // Hide queryResult from controls
  },
} as Meta<typeof PoolCard>;

type Story = StoryObj<PoolCardProps | PoolCardQueryProps>;

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
