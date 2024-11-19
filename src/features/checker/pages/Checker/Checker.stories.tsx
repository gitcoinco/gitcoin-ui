import type { Meta, StoryObj } from "@storybook/react";

import { Checker } from "./Checker";

const meta = {
  title: "Features/Checker/Pages/Checker",
  component: Checker,
  args: {
    address: "0x1234567890123456789012345678901234567890",
    roundId: "609",
    chainId: 42161,
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof Checker>;

export const Default: Story = {};
