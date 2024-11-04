import { Meta, StoryObj } from "@storybook/react";

import { RoundBadge, RoundStatus, RoundType } from "./RoundBadge";

const meta: Meta<typeof RoundBadge> = {
  title: "Components/RoundBadge",
  component: RoundBadge,
};

export default meta;
type Story = StoryObj<typeof RoundBadge>;

export const RoundStatusBadge: Story = {
  argTypes: {
    badge: {
      control: "select",
      options: Object.values(RoundStatus),
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
    type: "roundStatus",
    badge: RoundStatus.ApplicationsInProgress,
  },
};

// Story for roundType
export const RoundTypeBadge: Story = {
  argTypes: {
    badge: {
      control: "select",
      options: Object.values(RoundType),
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
    badge: RoundType.QuadraticFunding,
  },
};

export const PreRound: Story = {
  args: {
    type: "roundStatus",
    badge: RoundStatus.PreRound,
  },
  parameters: {
    docs: {
      storyDescription: "Displays the `Pre Round` status badge.",
    },
  },
};

export const RoundInProgress: Story = {
  args: {
    type: "roundStatus",
    badge: RoundStatus.RoundInProgress,
  },
  parameters: {
    docs: {
      storyDescription: "Displays the `Round In Progress` status badge.",
    },
  },
};

export const ApplicationsInProgress: Story = {
  args: {
    type: "roundStatus",
    badge: RoundStatus.ApplicationsInProgress,
  },
  parameters: {
    docs: {
      storyDescription: "Displays the `Applications In Progress` status badge.",
    },
  },
};

export const FundingPending: Story = {
  args: {
    type: "roundStatus",
    badge: RoundStatus.FundingPending,
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
    badge: RoundType.QuadraticFunding,
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
    badge: RoundType.DirectGrants,
  },
  parameters: {
    docs: {
      storyDescription: "Displays the `Direct Grants` type badge.",
    },
  },
};
