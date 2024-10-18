import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { expect, within } from "@storybook/test";

const meta = {
  title: "Examples/Components/Button",
  component: Button,
  args: {
    children: "Button",
    disabled: false,
    variant: "primary",
    size: "medium",
  },
  argTypes: {
    children: {
      name: "Label",
      control: "text",
      description: "Text to display on the button",
      table: { disable: true },
    },
    variant: {
      name: "Variant",
      description: "Variant of the button",
      control: "select",
      table: {
        defaultValue: {
          summary: "primary",
        },
        category: "style",
        subcategory: "Purpose",
      },
    },
    size: {
      name: "Size",
      control: "select",
      description: "Size of the button",
      options: ["small", "medium", "large"],
      table: {
        defaultValue: {
          summary: "medium",
        },
        category: "style",
        subcategory: "Size",
      },
    },
    disabled: {
      name: "Disabled",
      control: "boolean",
      description: "Disables the button",
      table: {
        defaultValue: {
          summary: "false",
          detail: "Defers to the built-in HTML attribute.",
        },
        category: "accessibility",
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
  },
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    expect(button.tagName).toBe("BUTTON");
  },
};

export const ButtonAsLink: Story = {
  args: {
    href: "https://example.com",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByText("Button");

    expect(button.tagName).toBe("A");
    expect(button).toHaveRole("link");
    expect(button).toHaveAttribute("href", "https://example.com");
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
  },
};

export const Small: Story = {
  args: {
    size: "small",
  },
};

export const Large: Story = {
  args: {
    size: "large",
  },
};

export const Dark: Story = {
  parameters: {
    themes: {
      themeOverride: "dark",
    },
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile2",
    },
  },
};
