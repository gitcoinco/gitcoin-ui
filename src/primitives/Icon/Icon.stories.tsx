import type { Meta, StoryObj } from "@storybook/react";
import { Icon, IconType } from "./Icon";

const meta = {
  title: "Primitives/Icon",
  component: Icon,
  args: {
    type: "check",
    color: "black",
  },
  argTypes: {
    type: {
      control: "select",
      options: Object.values(IconType),
    },
    color: {
      control: "color",
    },
    size: {
      control: "text",
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {};

export const WithThemeColor: Story = {
  args: {
    color: "grey-400",
  },
};

export const WithCustomColor: Story = {
  args: {
    color: "#ff00ff",
  },
  argTypes: {
    color: {
      control: "color",
    },
  },
};

export const WithCustomSize: Story = {
  args: {
    size: "40px",
  },
};
