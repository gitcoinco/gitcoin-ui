import { Meta, StoryObj } from "@storybook/react";

import { Icon, IconType } from "@/primitives/Icon";

import { Button, ButtonVariants } from ".";

const meta: Meta<typeof Button> = {
  title: "Primitives/Button",
  component: Button,
  args: {
    value: "Click Me",
    onClick: () => alert("Button clicked!"),
  },
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: [
          "primary",
          "secondary",
          "error",
          "success",
          "outlined-error",
          "outlined-success",
          "outlined-primary",
          "outlined-disabled",
          "disabled",
        ],
      },
      table: {
        type: {
          summary: "ButtonVariants",
        },
      },
    },
    size: {
      control: {
        type: "select",
        options: ["default"],
      },
      table: {
        type: {
          summary: "ButtonSizes",
        },
      },
    },
    iconPosition: {
      control: {
        type: "select",
        options: ["left", "right"],
      },
    },
    className: {
      control: "text",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Buttons: Story = {
  render: () => {
    const args = [
      {
        variant: "primary",
        value: "Primary",
      },
      {
        variant: "secondary",
        value: "Secondary",
      },
      {
        variant: "error",
        value: "Error",
      },
      {
        variant: "success",
        value: "Success",
      },
      {
        variant: "disabled",
        value: "Disabled",
        disabled: true,
      },
    ];

    return (
      <div className="flex space-x-4">
        {args.map((arg) => (
          <Button
            variant={arg.variant as ButtonVariants}
            value={arg.value}
            disabled={arg.disabled}
          />
        ))}
      </div>
    );
  },
};

export const Outlined: Story = {
  render: () => {
    const args = [
      {
        variant: "outlined-primary",
        value: "Outlined Primary",
      },
      {
        variant: "outlined-secondary",
        value: "Outlined Secondary",
      },
      {
        variant: "outlined-error",
        value: "Outlined Error",
      },
      {
        variant: "outlined-success",
        value: "Outlined Success",
      },
      {
        variant: "outlined-disabled",
        value: "Outlined Disabled",
        disabled: true,
      },
    ];

    return (
      <div className="flex space-x-4">
        {args.map((arg) => (
          <Button
            variant={arg.variant as ButtonVariants}
            value={arg.value}
            disabled={arg.disabled}
          />
        ))}
      </div>
    );
  },
};

export const WithIcon: Story = {
  render: () => {
    const args = [
      {
        icon: <Icon type={IconType.CHECK} />,
        iconPosition: "left",
        value: "Icon Left",
      },
      {
        icon: <Icon type={IconType.SPARKLES} />,
        iconPosition: "right",
        value: "Icon Right",
      },
    ];

    return (
      <div className="flex space-x-4">
        {args.map((arg) => (
          <Button
            icon={arg.icon}
            iconPosition={arg.iconPosition as "left" | "right"}
            value={arg.value}
          />
        ))}
      </div>
    );
  },
};

export const CustomClassName: Story = {
  args: {
    className: "bg-blue-500 border border-blue-700 text-white",
  },
};
