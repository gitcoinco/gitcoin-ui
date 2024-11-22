import { Meta, StoryObj } from "@storybook/react";

import { handlers } from "@/mocks/handlers";

import { ApplicationEvaluationOverviewPage } from "./ApplicationEvaluationOverviewPage";

const meta: Meta<typeof ApplicationEvaluationOverviewPage> = {
  title: "Features/Checker/Pages/ApplicationEvaluationOverviewPage",
  component: ApplicationEvaluationOverviewPage,
  argTypes: {
    chainId: {
      control: "number",
    },
    roundId: {
      control: "text",
    },
    applicationId: {
      control: "text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ApplicationEvaluationOverviewPage>;

export const Default: Story = {
  parameters: {
    msw: {
      handlers,
    },
  },
  args: {
    chainId: 42161,
    roundId: "609",
    applicationId: "0",
  },
};
