import { Meta, StoryObj } from "@storybook/react";
import { CircleStat } from "./CircleStat";
import { colors } from "@/tokens/colors";

const meta: Meta<typeof CircleStat> = {
  title: "Primitives/CircleStat",
  component: CircleStat,
  args: {
    text: 50,
  },
  argTypes: {
    color: {
      control: "color",
    },
    size: {
      control: "number",
    },
    text: {
      control: "number",
      table: {
        type: {
          summary: "number | string",
        },
      },
    },
    showPercentageSymbol: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof CircleStat>;

export default meta;

type Story = StoryObj<typeof CircleStat>;

export const Default: Story = {};

export const LowPercentage: Story = {
  args: {
    text: 23,
  },
};

export const MidPercentage: Story = {
  args: {
    text: 54,
  },
};

export const HighPercentage: Story = {
  args: {
    text: 60,
  },
};

export const CustomColor: Story = {
  args: {
    color: "#ff00ff",
  },
};

export const CustomSize: Story = {
  args: {
    size: 60,
  },
};

export const WithoutPercentageSymbol: Story = {
  args: {
    text: 42,
    showPercentageSymbol: false,
  },
};

export const CustomFont: Story = {
  args: {
    font: {
      family: "Arial",
      weight: "700",
      size: "18px",
      lineHeight: "28px",
      color: "#8c7373",
    },
  },
};
