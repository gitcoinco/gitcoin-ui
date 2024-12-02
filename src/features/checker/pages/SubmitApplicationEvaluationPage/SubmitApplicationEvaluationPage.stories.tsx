import { Meta, StoryObj } from "@storybook/react";

import { handlers } from "@/mocks/handlers";

import { usePerformEvaluation } from "~checker/hooks";
import { CheckerProvider } from "~checker/store";

import { SubmitApplicationEvaluationPage } from "./SubmitApplicationEvaluationPage";

const meta: Meta<typeof SubmitApplicationEvaluationPage> = {
  title: "Features/Checker/Pages/SubmitApplicationEvaluationPage",
  component: SubmitApplicationEvaluationPage,
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
    (Story) => {
      return (
        <CheckerProvider>
          <Story />
        </CheckerProvider>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof SubmitApplicationEvaluationPage>;

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
  render: (args) => {
    const { setEvaluationBody, isSuccess, isEvaluating, isError } = usePerformEvaluation();
    return (
      <SubmitApplicationEvaluationPage
        setEvaluationBody={setEvaluationBody}
        isSuccess={isSuccess}
        isEvaluating={isEvaluating}
        isError={isError}
        applicationId={args.applicationId}
        chainId={args.chainId}
        poolId={args.poolId}
      />
    );
  },
};
