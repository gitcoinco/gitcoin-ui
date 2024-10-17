import type { Meta, StoryObj } from "@storybook/react";

import { Card } from "./card";

const meta: Meta<typeof Card> = {
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Primary: Story = {
  args: {
    children: "This is a card, honestly will require a lot of variants :thinking:",
  },
};
