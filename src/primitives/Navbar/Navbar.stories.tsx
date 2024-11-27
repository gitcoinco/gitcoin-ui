import type { Meta, StoryObj } from "@storybook/react";



import { DefaultLogo } from "@/assets";



import { Navbar } from "./Navbar";
import { Button } from "../Button";
import { CheckerIcon } from "@/assets/icons";


// Adjust the path as needed

const meta = {
  title: "Primitives/Navbar",
  component: Navbar,
  args: {
    text: "My Navbar",
  },
  argTypes: {
    primaryLogo: {
      control: "text",
    },
    secondaryLogo: {
      control: "text",
    },
    primaryLogoLink: {
      control: "text",
    },
    secondaryLogoLink: {
      control: "text",
    },
    textLink: {
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

export const Default: Story = {
  args: {
    primaryLogoLink: "#",
    secondaryLogo: CheckerIcon,
    secondaryLogoLink: "#",
    textLink: "#",
  },
};

export const WithSecondaryLogo: Story = {
  args: {
    primaryLogoLink: "#",
    secondaryLogo: DefaultLogo,
    secondaryLogoLink: "#",
    textLink: "#",
  },
};

export const WithCustomTextAndWithoutDivider: Story = {
  args: {
    primaryLogoLink: "#",
    text: "Custom Navbar",
    textLink: "#",
    showDivider: false,
  },
};

export const WithChildren: Story = {
  args: {
    secondaryLogo: DefaultLogo,
    secondaryLogoLink: "#",
    textLink: "#",
    children: <Button value="Connect Wallet"/>,
  },
};