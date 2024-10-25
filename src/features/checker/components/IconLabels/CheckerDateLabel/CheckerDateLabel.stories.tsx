import type { Meta, StoryObj } from "@storybook/react";
import { CheckerDateLabel } from "./CheckerDateLabel";

const meta = {
  title: "Features/Checker/components/CheckerDateLabel",
  component: CheckerDateLabel,
  args: {
    date: new Date(),
  },
  argTypes: {
    date: {
      control: "date",
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof CheckerDateLabel>;

export const Default: Story = {};
