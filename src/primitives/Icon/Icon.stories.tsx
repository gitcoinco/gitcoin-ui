import type { Meta, StoryObj } from "@storybook/react";
import { Icon, IconType } from "./Icon";

const meta = {
  title: "Primitives/Icon",
  component: Icon,
  args: {
    type: "check",
  },
  argTypes: {
    type: {
      control: "select",
      options: Object.values(IconType),
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {};

export const WithThemeColor: Story = {
  args: {
    className: "ui-fill-grey-400",
  },
};

export const WithCustomColor: Story = {
  args: {
    className: "ui-fill-[#ff00ff]",
  },
};

export const WithCustomSize: Story = {
  args: {
    className: "ui-size-[40px]",
  },
};
