import { Meta, StoryObj } from "@storybook/react";

import { RoundStatus, RoundType } from "@/components/Badges";
import { RoundCardProps } from "@/components/round/types/types";
import { createQueryState } from "@/lib/tanstack/queryResults";

import { RoundCard } from "./RoundCard";

const simpleRound = {
  roundName: "Round Card",
  roundId: "90",
  chainId: 8453,
  roundType: RoundType.QuadraticFunding,
  startDate: new Date(),
  endDate: new Date(),
  roundStatus: RoundStatus.ApplicationsInProgress,
  redirectLink: "https://explorer.gitcoin.co/#/round/{chainId}/{roundId}",
  redirect: true,
};

export default {
  title: "Components/round/RoundCard",
  component: RoundCard,
  argTypes: {
    roundName: { control: "text" },
    roundId: { control: "text" },
    chainId: { control: "number" },
    roundType: { control: "select", options: Object.values(RoundType) },
    roundStatus: { control: "select", options: Object.values(RoundStatus) },
    startDate: { control: "date" },
    endDate: { control: "date" },
    queryResult: { table: { disable: true } }, // Hide queryResult from controls
  },
} as Meta<typeof RoundCard>;

type Story = StoryObj<RoundCardProps>;

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
