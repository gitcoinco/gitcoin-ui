import type { Meta, StoryObj } from "@storybook/react";

import { handlers } from "@/mocks/handlers";

import { Checker } from "./Checker";

const meta = {
  title: "Features/Checker/Pages/ReviewApplicationsPage",
  component: Checker,
  args: {
    address: "0x1234567890123456789012345678901234567890",
    poolId: "609",
    chainId: 42161,
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof Checker>;

export const Default: Story = {
  parameters: {
    msw: {
      handlers,
    },
  },
};
