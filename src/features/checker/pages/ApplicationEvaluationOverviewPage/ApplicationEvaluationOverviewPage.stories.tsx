import { Meta, StoryObj } from "@storybook/react";

import { handlers } from "@/mocks/handlers";

import { CheckerProvider } from "~checker/store";

import { ApplicationEvaluationOverviewPage } from "./ApplicationEvaluationOverviewPage";

const meta: Meta<typeof ApplicationEvaluationOverviewPage> = {
  title: "Features/Checker/Pages/ApplicationEvaluationOverviewPage",
  component: ApplicationEvaluationOverviewPage,
  argTypes: {
    chainId: {
      control: "number",
    },
    poolId: {
      control: "text",
    },
    applicationId: {
      control: "text",
    },
  },
  decorators: [
    (Story) => (
      <CheckerProvider>
        <Story />
      </CheckerProvider>
    ),
  ],
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
    poolId: "609",
    applicationId: "17",
  },
};
