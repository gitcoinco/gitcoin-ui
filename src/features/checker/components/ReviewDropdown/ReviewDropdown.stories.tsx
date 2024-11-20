import type { Meta, StoryObj } from "@storybook/react";

import ReviewDropdown from "./ReviewDropdown";
import { EvaluationSummaryProps } from "./types";

const mockData: EvaluationSummaryProps[] = [
  {
    evaluator: "0x1234567890123456789012345678901234567890",
    evaluationStatus: "approved",
    evaluatorType: "human",
    evaluation: [
      {
        question: "How would you rate the quality of the content?",
        answer: "YES",
      },
      {
        question: "Was the content easy to understand?",
        answer: "NO",
      },
      {
        question: "Was the content engaging?",
        answer: "UNCERTAIN",
      },
    ],
    summary:
      "The content was well-researched, engaging, and easy to understand. The overall experience was very positive.",
    lastUpdatedAt: "2024-11-20T13:04:36.042449",
  },
  {
    evaluator: "0x1234567890123456789012345678901234567890",
    evaluationStatus: "rejected",
    evaluatorType: "human",
    evaluation: [
      {
        question: "How would you rate the quality of the content?",
        answer: "YES",
      },
      {
        question: "Was the content easy to understand?",
        answer: "YES",
      },
      {
        question: "Was the content engaging?",
        answer: "UNCERTAIN",
      },
    ],
    summary:
      "The content was well-researched, engaging, and easy to understand. The overall experience was very positive.",
    lastUpdatedAt: "2024-11-20T13:04:36.042449",
  },
  {
    evaluator: "0x1234567890123456789012345678901234567890",
    evaluationStatus: "uncertain",
    evaluatorType: "llm_gpt3",
    evaluation: [
      {
        question: "How would you rate the quality of the content?",
        answer: "YES",
      },
      {
        question: "Was the content easy to understand?",
        answer: "NO",
      },
      {
        question: "Was the content engaging?",
        answer: "UNCERTAIN",
      },
    ],
    summary:
      "The content was well-researched, engaging, and easy to understand. The overall experience was very positive.",
    lastUpdatedAt: "2024-11-20T13:04:36.042449",
  },
];

const meta: Meta<typeof ReviewDropdown> = {
  component: ReviewDropdown,
  title: "Features/Checker/Components/ReviewDropdown", // Adjust the path as per your Storybook organization
} satisfies Meta<typeof ReviewDropdown>;

export default meta;

type Story = StoryObj<typeof ReviewDropdown>;

export const Default: Story = {
  args: { evaluation: { ...mockData[0] }, index: 1 },
};

export const Rejected: Story = {
  args: { evaluation: { ...mockData[1] }, index: 2 },
};

export const LlmGpt3: Story = {
  args: { evaluation: { ...mockData[2] }, index: 3 },
};
