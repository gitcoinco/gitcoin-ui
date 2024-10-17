import type { Meta, StoryObj } from "@storybook/react";

import { AnimatedNumber } from "./AnimatedNumber";

const meta: Meta<typeof AnimatedNumber> = {
  component: AnimatedNumber,
};

export default meta;
type Story = StoryObj<typeof AnimatedNumber>;

export const Primary: Story = {
  args: {
    end: 1000,
    duration: 2000,
  },
};
