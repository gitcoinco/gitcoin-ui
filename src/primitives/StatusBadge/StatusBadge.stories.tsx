import type { Meta, StoryObj } from "@storybook/react";
import { expect, within } from "@storybook/test";

import { Status, StatusBadge } from "./StatusBadge";

const meta: Meta<typeof StatusBadge> = {
  title: "Primitives/StatusBadge",
  args: {
    status: Status.INPROGRESS,
  },
  argTypes: {
    status: {
      control: "select",
      options: Object.values(Status),
    },
  },

  component: StatusBadge,
};

export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Default: Story = {};

export const Ended: Story = {
  args: {
    status: Status.ENDED,
  },
};

export const Empty: Story = {
  args: {
    status: Status.HIDDEN,
  },
};

// export const AsString: Story = {
//   args: {
//     status: "Active"
//   },
// };
