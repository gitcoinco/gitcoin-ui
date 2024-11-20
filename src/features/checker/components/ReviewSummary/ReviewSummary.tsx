import * as React from "react";

import { tv, type VariantProps } from "tailwind-variants";

import { cn, formatLocalDate } from "@/lib/utils";
import { Accordion } from "@/primitives/Accordion";
import { Icon, IconType } from "@/primitives/Icon";

import { EvaluationSummaryProps } from "./types";

const reviewSummaryVariants = tv({
  slots: {
    header: "flex w-full items-center justify-between gap-4 p-8",
    headerLeft: "flex flex-1 items-center gap-4",
    headerRight: "flex items-center justify-end gap-2",
    content: "flex w-full flex-col gap-6 p-8",
    textRow: "text-left",
    status: "text-sm text-gray-600",
    summary: "flex items-center gap-2 self-stretch rounded-lg bg-gray-50 p-4",
  },
  defaultVariants: {
    // variant: "default",
  },
});

export type ReviewSummaryVariants = VariantProps<typeof reviewSummaryVariants>;

interface ReviewSummaryContentProps {
  evaluation: EvaluationSummaryProps;
}

// Main Component
const ReviewSummary: React.FC<ReviewSummaryContentProps> = ({ evaluation }) => {
  const accordionVariant = evaluation.evaluatorType === "human" ? "light" : "blue";
  return (
    <Accordion
      border="md"
      variant={accordionVariant}
      header={<ReviewSummaryHeader evaluation={evaluation} />}
      content={<ReviewSummaryContent evaluation={evaluation} />}
    />
  );
};

// Header Component
const ReviewSummaryHeader: React.FC<ReviewSummaryContentProps> = ({ evaluation }) => {
  const evaluatorIconType = evaluation.evaluatorType === "human" ? IconType.USER : IconType.SHINE;
  const rating = evaluation.evaluation.filter((answer) => answer.answer === "YES").length;
  const icon =
    evaluation.evaluationStatus === "approved" ? (
      <Icon type={IconType.SOLID_CHECK} />
    ) : (
      <Icon type={IconType.SOLID_X} />
    );

  const { header, headerLeft, headerRight, textRow, status } = reviewSummaryVariants({
    variant: "default",
  });

  return (
    <div className={cn(header())}>
      <div className={cn(headerLeft())}>
        <Icon type={evaluatorIconType} />
        <div>
          <p className={cn(textRow())}>
            <span className="font-sans text-xl text-black">Review by</span>
            <span className="font-sans text-sm  font-normal text-gray-900">
              {" "}
              {evaluation.evaluator.slice(0, 4)}...{evaluation.evaluator.slice(-4)}
            </span>
          </p>
          <p className={cn(textRow(), "text-md font-normal text-black")}>
            Reviewed on {formatLocalDate(evaluation.lastUpdatedAt)}
          </p>
        </div>
      </div>
      <div className={cn(headerRight())}>
        {icon}
        <p className={cn(status())}>{rating}/5</p>
        <p className={cn(status())}>{evaluation.evaluationStatus}</p>
      </div>
    </div>
  );
};

// Content Component
const ReviewSummaryContent: React.FC<ReviewSummaryContentProps> = ({ evaluation }) => {
  const { content } = reviewSummaryVariants({ variant: "default" });

  return (
    <div className={cn(content())}>
      <EvaluationSummary evaluation={evaluation} />
      <EvaluationAnswers evaluation={evaluation} />
    </div>
  );
};

const EvaluationSummary: React.FC<ReviewSummaryContentProps> = ({ evaluation }) => {
  const { summary } = reviewSummaryVariants({ variant: "default" });
  return (
    <div className={cn(summary())}>
      <p>Summary: {evaluation.summary}</p>
    </div>
  );
};

const EvaluationAnswers: React.FC<ReviewSummaryContentProps> = ({ evaluation }) => {
  return (
    <div>
      {evaluation.evaluation.map((evaluation, index) => (
        <p key={index}>
          {evaluation.question}: {evaluation.answer}
        </p>
      ))}
    </div>
  );
};

export default ReviewSummary;
