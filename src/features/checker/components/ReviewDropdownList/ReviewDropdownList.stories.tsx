import type { Meta, StoryObj } from "@storybook/react";

import { EvaluationSummaryProps } from "../ReviewDropdown/types";
import ReviewDropdownList from "./ReviewDropdownList";

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

const meta: Meta<typeof ReviewDropdownList> = {
  component: ReviewDropdownList,
  title: "Features/Checker/Components/ReviewDropdownList",
} satisfies Meta<typeof ReviewDropdownList>;

export default meta;

type Story = StoryObj<typeof ReviewDropdownList>;

export const Default: Story = {
  args: { evaluations: mockData },
};
