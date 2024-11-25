import { Meta, StoryObj } from "@storybook/react";

import { PoolBadge, PoolStatus, PoolType } from "./PoolBadge";

const meta: Meta<typeof PoolBadge> = {
  title: "Components/PoolBadge",
  component: PoolBadge,
};

export default meta;
type Story = StoryObj<typeof PoolBadge>;

export const PoolStatusBadge: Story = {
  argTypes: {
    badge: {
      control: "select",
      options: Object.values(PoolStatus),
      description: "The specific badge value.",
    },
    // Exclude the type from the controls
    type: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    type: "poolStatus",
    badge: PoolStatus.ApplicationsInProgress,
  },
};

// Story for roundType
export const PoolTypeBadge: Story = {
  argTypes: {
    badge: {
      control: "select",
      options: Object.values(PoolType),
      description: "The specific badge value.",
    },
    type: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    type: "roundType",
    badge: PoolType.QuadraticFunding,
  },
};

export const PreRound: Story = {
  args: {
    type: "poolStatus",
    badge: PoolStatus.PreRound,
  },
  parameters: {
    docs: {
      storyDescription: "Displays the `Pre Round` status badge.",
    },
  },
};

export const RoundInProgress: Story = {
  args: {
    type: "poolStatus",
    badge: PoolStatus.RoundInProgress,
  },
  parameters: {
    docs: {
      storyDescription: "Displays the `Round In Progress` status badge.",
    },
  },
};

export const ApplicationsInProgress: Story = {
  args: {
    type: "poolStatus",
    badge: PoolStatus.ApplicationsInProgress,
  },
  parameters: {
    docs: {
      storyDescription: "Displays the `Applications In Progress` status badge.",
    },
  },
};

export const FundingPending: Story = {
  args: {
    type: "poolStatus",
    badge: PoolStatus.FundingPending,
  },
  parameters: {
    docs: {
      storyDescription: "Displays the `Funding Pending` status badge.",
    },
  },
};

export const QuadraticFunding: Story = {
  args: {
    type: "roundType",
    badge: PoolType.QuadraticFunding,
  },
  parameters: {
    docs: {
      storyDescription: "Displays the `Quadratic Funding` type badge.",
    },
  },
};

export const DirectGrants: Story = {
  args: {
    type: "roundType",
    badge: PoolType.DirectGrants,
  },
  parameters: {
    docs: {
      storyDescription: "Displays the `Direct Grants` type badge.",
    },
  },
};
