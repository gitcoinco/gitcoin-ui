import { Meta, StoryObj } from "@storybook/react";

import { ViewApplicationEvaluationsPage } from "./ViewApplicationEvaluationsPage";

const meta: Meta<typeof ViewApplicationEvaluationsPage> = {
  title: "Features/Checker/Pages/ViewApplicationEvaluationsPage",
  component: ViewApplicationEvaluationsPage,
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

type Story = StoryObj<typeof ViewApplicationEvaluationsPage>;

export const Default: Story = {
  args: {
    chainId: 1,
    roundId: "1",
    applicationId: "app-123",
  },
};
