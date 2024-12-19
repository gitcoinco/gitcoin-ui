import type { Meta, StoryObj } from "@storybook/react";

import { SetupProgressForm } from "./SetupProgressForm";
import { roundSetupSteps } from "./mocks/RoundSetup";

const meta: Meta<typeof SetupProgressForm> = {
  title: "Components/SetupProgressForm",
  component: SetupProgressForm,
  args: {
    steps: roundSetupSteps,
  },
} satisfies Meta<typeof SetupProgressForm>;

export default meta;

type Story = StoryObj<typeof SetupProgressForm>;

export const Default: Story = {
  args: {
    name: "Round setup",
    steps: roundSetupSteps,
  },
};
