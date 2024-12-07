// IconLabel.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";

import { DateFormat, formatDate } from "@/lib/dates/formatDate";
import { IconType } from "@/primitives/Icon";

import { IconLabel } from "./IconLabel";

// Define metadata for the IconLabel component
const meta: Meta<typeof IconLabel> = {
  component: IconLabel,
  argTypes: {
    type: {
      control: "select",
      options: ["default", "ai-evaluation", "date", "dateWithPrefix", "address", "social"],
    },
    platform: {
      control: "select",
      options: ["github", "twitter", "website"],
      if: { arg: "type", eq: "social" },
    },
    percent: {
      control: {
        type: "number",
        min: 0,
        max: 100,
      },
      if: { arg: "type", eq: "ai-evaluation" },
    },
    date: {
      control: {
        type: "date",
      },
      if: { arg: "type", eq: "date" },
    },
    prefix: {
      control: "text",
      if: { arg: "type", eq: "dateWithPrefix" },
    },
    startDate: {
      control: {
        type: "date",
      },
      if: { arg: "type", eq: "period" },
    },
    endDate: {
      control: {
        type: "date",
      },
      if: { arg: "type", eq: "period" },
    },
    address: {
      control: "text",
      if: { arg: "type", eq: "address" },
    },
    ens: {
      control: "text",
      if: { arg: "type", eq: "address" },
    },
    link: {
      control: "text",
      if: { arg: "type", eq: "social" },
    },
    isVerified: {
      control: "boolean",
      if: { arg: "type", eq: "social" },
    },
    iconType: {
      control: "select",
      options: Object.values(IconType),
      if: { arg: "type", eq: "default" },
    },
    label: {
      control: "text",
      if: { arg: "type", eq: "default" },
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the component.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconLabel>;

export const Playground: Story = {
  args: {
    iconType: IconType.ETH,
    label: "Default Label",
    percent: 77, // Default for evaluation
    date: new Date(), // Default for date
    prefix: "Applied on: ", // Default for dateWithPrefix
    address: "0xE307051C410e970b861CC55CBFD5Acc7BB477750", // Default for address
    link: "https://github.com/user", // Default for social
    isVerified: false, // Default for social
    startDate: new Date(), // Default for period
    endDate: new Date(), // Default for period
  },
};

export const Default: Story = {
  args: {
    iconType: IconType.ETH,
    label: "Default Label",
    type: "default",
  },
};

// Evaluation Label Story
export const AIEvaluation: Story = {
  args: {
    type: "ai-evaluation",
    percent: 77,
  },
  argTypes: {
    type: {
      control: {
        data: "number",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const message = await canvas.findByText(/Approve \(77%\)/i);
    expect(message).toBeInTheDocument();
  },
};

// Date Label Story
export const DateLabel: Story = {
  args: {
    type: "date",
    date: new Date(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const formattedDate = formatDate(new Date(), DateFormat.FullDate24Hour);
    const dateText = await canvas.findByText(formattedDate);
    expect(dateText).toBeInTheDocument();
  },
};

export const Period: Story = {
  args: {
    type: "period",
    startDate: new Date(),
    endDate: new Date(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const formattedStartDate = formatDate(new Date(), DateFormat.ShortMonthDayYear);
    const formattedEndDate = formatDate(new Date(), DateFormat.ShortMonthDayYear);
    const dateText = await canvas.findByText(`${formattedStartDate} - ${formattedEndDate}`);
    expect(dateText).toBeInTheDocument();
  },
};

// Date Label with Prefix Story
export const DateWithPrefix: Story = {
  args: {
    type: "dateWithPrefix",
    date: new Date(),
    prefix: "Applied on:",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const formattedDate = formatDate(new Date(), DateFormat.FullDate12Hour);
    const dateText = await canvas.findByText(`Applied on: ${formattedDate}`);
    expect(dateText).toBeInTheDocument();
  },
};

// Address Label Story
export const Address: Story = {
  args: {
    type: "address",
    address: "0xE307051C410e970b861CC55CBFD5Acc7BB477750",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const addressText = await canvas.findByText("0xE3...7750");
    expect(addressText).toBeInTheDocument();
  },
};
// Address (ens) Label Story
export const AddressENS: Story = {
  args: {
    type: "address",
    address: "0xE307051C410e970b861CC55CBFD5Acc7BB477750",
    ens: "user.eth",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const addressText = await canvas.findByText("user.eth");
    expect(addressText).toBeInTheDocument();
  },
};

// Social(Website) Label Story
export const SocialWebsite: Story = {
  args: {
    type: "social",
    platform: "website",
    link: "https://example.com",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const linkText = await canvas.findByText("https://example.com");
    expect(linkText).toBeInTheDocument();
  },
};
// Social(GitHub) Label Story
export const SocialGithub: Story = {
  args: {
    type: "social",
    platform: "github",
    link: "https://github.com/user",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const linkText = await canvas.findByText("user");
    expect(linkText).toBeInTheDocument();
  },
};
// Social(Twitter) Label Story
export const SocialTwitter: Story = {
  args: {
    type: "social",
    platform: "twitter",
    link: "https://twitter.com/user",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const linkText = await canvas.findByText("@user");
    expect(linkText).toBeInTheDocument();
  },
};
