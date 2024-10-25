import type { Meta, StoryObj } from "@storybook/react";

import { IconType, Icon as IconComponent } from "@/primitives/Icon";

import { Button } from "./button";

const meta = {
  title: "Shadcn/Button",
  component: Button,
  args: {
    variant: "default",
    size: "default",
    children: "Button",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline", "ghost", "link"],
    },
    size: {
      control: "radio",
      options: ["default", "sm", "lg", "icon"],
    },
  },
  render: ({ children, ...args }) => <Button {...args}>{children}</Button>,
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    children: "Link",
  },
};

export const Icon: Story = {
  args: {
    size: "icon",
    variant: "outline",
    asChild: true,
    children: <IconComponent type={IconType.CHECK} />,
  },
};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};
