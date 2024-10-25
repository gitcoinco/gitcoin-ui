import type { Meta, StoryObj } from "@storybook/react";

import { CheckerAILabel } from "./CheckerAILabel";

const meta = {
  title: "Features/Checker/components/CheckerAILabel",
  component: CheckerAILabel,
  args: {
    percent: 77,
  },
  argTypes: {
    percent: {
      control: "number",
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof CheckerAILabel>;

export const Default: Story = {};
