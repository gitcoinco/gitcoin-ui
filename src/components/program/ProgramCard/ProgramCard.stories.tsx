import { Meta, StoryObj } from "@storybook/react";

import { createQueryState } from "@/lib";

import { ProgramCard, ProgramCardProps, ProgramCardQueryProps } from "./ProgramCard";

const program: ProgramCardProps = {
  id: "0x123456789",
  chainId: 1,
  title: "Gitcoin Grants Stack",
  operatorsCount: 2,
  roundsCount: 10,
  onClick: () => alert("Program clicked!"),
};

export default {
  title: "Components/program/ProgramCard",
  component: ProgramCard,
  argTypes: {
    id: { control: "text" },
    chainId: { control: "number" },
    title: { control: "text" },
    operatorsCount: { control: "number" },
    roundsCount: { control: "number" },
  },
} as Meta<typeof ProgramCard>;

type Story = StoryObj<ProgramCardProps | ProgramCardQueryProps>;

export const Default: Story = {
  args: {
    ...program,
  },
};

export const Loading: Story = {
  args: {
    queryResult: createQueryState("pending"),
  },
};

export const Success: Story = {
  args: {
    queryResult: createQueryState<ProgramCardProps>("success", {
      ...program,
    }),
  },
};

export const Error: Story = {
  args: {
    queryResult: createQueryState<ProgramCardProps>("error", undefined),
  },
};
