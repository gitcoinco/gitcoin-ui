import { Meta, StoryObj } from "@storybook/react";

import { BaseButton } from "./BaseButton";
import { Icon, IconType } from "@/primitives/Icon";

const meta: Meta<typeof BaseButton> = {
  title: "Primitives/BaseButton",
  component: BaseButton,
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
} satisfies Meta<typeof BaseButton>;

export default meta;

type Story = StoryObj<typeof BaseButton>;

export const Default: Story = {};

export const PrimaryButton: Story = {
  args: {
    variant: "primary",
  },
};

export const SecondaryButton: Story = {
  args: {
    variant: "secondary",
  },
};

export const DisabledButton: Story = {
  args: {
    disabled: true,
  },
};

export const ErrorButton: Story = {
  args: {
    variant: "error",
  },
};

export const SuccessButton: Story = {
  args: {
    variant: "success",
  },
};

export const OutlinedErrorButton: Story = {
  args: {
    variant: "outlined-error",
  },
};

export const OutlinedSuccessButton: Story = {
  args: {
    variant: "outlined-success",
  },
};

export const OutlinedDisabledButton: Story = {
  args: {
    disabled: true,
    variant: "outlined-success",
  },
};

export const WithIcon: Story = {
  args: {
    icon: <Icon type={IconType.CHECK} />,
    iconPosition: "left",
  },
};

// export const WithIconRight: Story = {
//   args: {
//     icon: <ExampleIcon />,
//     iconPosition: "right",
//   },
// };

export const CustomClassName: Story = {
  args: {
    className: "bg-blue-500 border border-blue-700 text-white",
  },
};
