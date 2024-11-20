import * as React from "react";



import { tv, type VariantProps } from "tailwind-variants";

import { cn, formatLocalDate } from "@/lib/utils";
import { Accordion } from "@/primitives/Accordion";
import { Badge } from "@/primitives/Badge/Badge";
import { Icon, IconType } from "@/primitives/Icon";

import { EvaluationSummaryProps } from "./types";
const reviewSummaryVariants = tv({
  slots: {
    header: "flex w-full items-center justify-between gap-4 py-8 pr-2",
    headerLeft: "flex flex-1 items-center gap-4",
    headerRight: "flex items-center justify-end gap-2",
    content: "flex w-full flex-col gap-6 p-8",
    textRow: "text-left",
    status: "text-sm text-gray-600",
    summary: "flex items-center gap-2 self-stretch rounded-lg bg-gray-50 p-4",
    reviewTitle: "font-sans text-xl text-black",
    evaluatorTitle: "font-sans text-sm font-normal text-gray-900",
    reviewDate: "text-base font-normal text-black",
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
      padding="md"
      variant={accordionVariant}
      header={<ReviewSummaryHeader evaluation={evaluation} />}
      content={<ReviewSummaryContent evaluation={evaluation} />}
    />
  );
};

// Header Component
const ReviewSummaryHeader: React.FC<ReviewSummaryContentProps> = ({ evaluation }) => {
  let reviewTitle = "";
  let evaluatorTitle = "";
  let evaluatorIconType;

  if (evaluation.evaluatorType === "human") {
    reviewTitle = "Reviewed by";
    evaluatorIconType = IconType.USER;
    evaluatorTitle = `${evaluation.evaluator.slice(0, 4)}...${evaluation.evaluator.slice(-4)}`;
  } else {
    reviewTitle = "AI Powered";
    evaluatorIconType = IconType.SHINE;
    evaluatorTitle = "BETA";
  }

  const rating = evaluation.evaluation.filter((answer) => answer.answer === "YES").length;

  const reviewStatusBadgeVariant =
    evaluation.evaluationStatus === "approved"
      ? "success-strong"
      : evaluation.evaluationStatus === "rejected"
        ? "error-strong"
        : "info-strong";

  const {
    header,
    headerLeft,
    headerRight,
    textRow,
    status,
    reviewTitle: reviewTitleClass,
    evaluatorTitle: evaluatorTitleClass,
    reviewDate,
  } = reviewSummaryVariants({
    variant: "default",
  });

  return (
    <div className={cn(header())}>
      <div className={cn(headerLeft())}>
        <Icon type={evaluatorIconType} />
        <div>
          <p className={cn(textRow())}>
            <span className={cn(reviewTitleClass())}>{reviewTitle}</span>
            <span className={cn(evaluatorTitleClass())}> {evaluatorTitle}</span>
          </p>
          <p className={cn(textRow(), reviewDate())}>
            Reviewed on {formatLocalDate(evaluation.lastUpdatedAt)}
          </p>
        </div>
      </div>
      <div className={cn(headerRight())}>
        {getIcon(evaluation)}
        <p className={cn(status())}>
          {rating}/{evaluation.evaluation.length}
        </p>
        <Badge variant={reviewStatusBadgeVariant}>
          {evaluation.evaluationStatus.charAt(0).toUpperCase() +
            evaluation.evaluationStatus.slice(1)}
        </Badge>
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
      <p>{evaluation.summary}</p>
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

const getIcon = (evaluation: EvaluationSummaryProps) => {
  switch (evaluation.evaluationStatus) {
    case "approved":
      return <Icon type={IconType.SOLID_CHECK} />;
    case "rejected":
      return <Icon type={IconType.SOLID_X} />;
    case "uncertain":
      return <Icon type={IconType.SOLID_QUESTION_MARK_CIRCLE} />;
    default:
      return <Icon type={IconType.SOLID_QUESTION_MARK_CIRCLE} />;
  }
};