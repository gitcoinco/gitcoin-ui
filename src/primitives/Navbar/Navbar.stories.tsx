import type { Meta, StoryObj } from "@storybook/react";

import { DefaultLogo } from "@/assets";

import { Navbar } from "./Navbar";

const meta = {
  title: "Primitives/Navbar",
  component: Navbar,
  args: {
    text: "My Navbar",
  },
  argTypes: {
    logo1: {
      control: "text",
    },
    logo2: {
      control: "text",
    },
    text: {
      control: "text",
    },
    children: {
      control: "text",
    },
  },
} satisfies Meta<typeof Navbar>;

export default meta;

type Story = StoryObj<typeof Navbar>;

export const Default: Story = {};

export const WithSecondLogo: Story = {
  args: {
    logo2: DefaultLogo,
  },
};

export const WithCustomTextAndWithoutDivider: Story = {
  args: {
    text: "Custom Navbar",
    showDivider: false,
  },
};

export const WithChildren: Story = {
  args: {
    children: <button>Login</button>,
  },
};
