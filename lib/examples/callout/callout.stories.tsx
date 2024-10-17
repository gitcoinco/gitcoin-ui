import type { Meta, StoryObj } from "@storybook/react";
import { Callout } from "./callout";

const meta = {
  title: "Primitives/Callout",
  component: Callout,
  args: {
    children: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  },
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["primary", "information", "success", "warning", "danger"],
      },
    },
  },
} satisfies Meta;

export default meta;

export type Story = StoryObj<typeof Callout>;

export const Primary: Story = {
  args: {
    title: "Primary",
  },
};

export const Information: Story = {
  args: {
    title: "Information",
    variant: "information",
  },
};

export const Success: Story = {
  args: {
    title: "Success",
    variant: "success",
  },
};

export const Warning: Story = {
  args: {
    title: "Warning",
    variant: "warning",
  },
};

export const Danger: Story = {
  args: {
    title: "Danger",
    variant: "danger",
  },
};
