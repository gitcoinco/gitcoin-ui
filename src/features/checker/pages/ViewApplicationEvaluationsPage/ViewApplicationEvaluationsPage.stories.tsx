import { Meta, StoryObj } from "@storybook/react";
import { handlers } from "@/mocks/handlers";

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
  // parameters: {
  //   msw: {
  //     handlers,
  //   },
  // },
  args: {
    chainId: 42161,
    roundId: "609",
    applicationId: "0",
  },
};