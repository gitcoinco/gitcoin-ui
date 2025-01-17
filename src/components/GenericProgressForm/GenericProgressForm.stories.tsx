import type { Meta, StoryObj } from "@storybook/react";

import { GenericProgressForm } from "./GenericProgressForm";
import { roundSetupSteps } from "./mocks/RoundSetup";

const meta: Meta<typeof GenericProgressForm> = {
  title: "Components/GenericProgressForm",
  component: GenericProgressForm,
} satisfies Meta<typeof GenericProgressForm>;

export default meta;

type Story = StoryObj<typeof GenericProgressForm>;

export const Default: Story = {
  args: {
    name: "Round setup",
    steps: roundSetupSteps,
    onSubmit: async (values: any) => {
      console.log("Submitted final values:", values);
    },
    dbName: "formDB",
    storeName: "formDrafts",
  },
};
