import React from "react";

import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { CheckerProvider } from "~checker/store";

import { Checker } from "./Checker";
import { usePerformEvaluation, usePerformOnChainReview } from "./hooks";

const meta = {
  title: "Features/Checker",
  component: Checker,
  args: {
    address: "0x1234567890123456789012345678901234567890",
    poolId: "597",
    chainId: 11155111,
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof Checker>;

export const Default: Story = {
  decorators: [
    (Story) => {
      // New StoryWrapper component
      const StoryWrapper = () => {
        const { setEvaluationBody, isSigning, isSuccess, isEvaluating, isError, isErrorSigning } =
          usePerformEvaluation();
        const { steps, setReviewBody, isReviewing } = usePerformOnChainReview();

        return (
          <Story
            setEvaluationBody={setEvaluationBody}
            isSigning={isSigning}
            isSuccess={isSuccess}
            isEvaluating={isEvaluating}
            isError={isError}
            isErrorSigning={isErrorSigning}
            steps={steps}
            setReviewBody={setReviewBody}
            isReviewing={isReviewing}
          />
        );
      };

      return (
        <CheckerProvider>
          <StoryWrapper />
        </CheckerProvider>
      );
    },
  ],
  parameters: {
    // msw: {
    //   handlers,
    // },
  },
};
