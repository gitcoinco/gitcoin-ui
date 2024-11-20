import * as React from "react";

import { tv, type VariantProps } from "tailwind-variants";

import { cn, formatLocalDate } from "@/lib/utils";
import { Accordion } from "@/primitives/Accordion";
import { Badge } from "@/primitives/Badge/Badge";
import { Icon, IconType } from "@/primitives/Icon";

import { EvaluationSummaryProps } from "./types";

const ReviewDropdownVariants = tv({
  slots: {
    header: "flex w-full items-center justify-between gap-4 py-8 pr-2",
    headerLeft: "flex flex-1 items-center gap-4",
    headerRight: "flex items-center justify-end gap-2",
    content: "flex w-full flex-col gap-6 p-8",
    textRow: "space-x-1 text-left",
    status: "text-sm text-gray-600",
    reviewTitle: "font-sans text-xl text-black",
    evaluatorTitle: "font-sans text-sm font-normal text-gray-900",
    reviewDate: "text-base font-normal text-black",
  },
  defaultVariants: {},
});

const evaluationSummaryVariants = tv({
  base: "flex items-center gap-2 self-stretch rounded-lg p-4",
  variants: {
    background: {
      default: "bg-gray-50",
      light: "bg-white",
    },
  },
  defaultVariants: {
    background: "default",
  },
});

export type ReviewDropdownVariants = VariantProps<typeof ReviewDropdownVariants>;
export type EvaluationSummaryVariants = VariantProps<typeof evaluationSummaryVariants>;

interface ReviewDropdownContentProps {
  evaluation: EvaluationSummaryProps;
  index?: number;
}

// Main Component
const ReviewDropdown: React.FC<ReviewDropdownContentProps> = ({ evaluation, index }) => {
  const accordionVariant = evaluation.evaluatorType === "human" ? "light" : "blue";
  return (
    <Accordion
      border="md"
      padding="md"
      variant={accordionVariant}
      header={<ReviewDropdownHeader evaluation={evaluation} index={index} />}
      content={<ReviewDropdownContent evaluation={evaluation} />}
    />
  );
};

// Header Component
const ReviewDropdownHeader: React.FC<ReviewDropdownContentProps> = ({ evaluation, index }) => {
  let reviewTitle = "";
  let evaluatorTitle = "";
  let evaluatorIconType;

  if (evaluation.evaluatorType === "human") {
    reviewTitle = `Review ${index ?? ""}`;
    evaluatorIconType = IconType.USER;
    evaluatorTitle = `by ${evaluation.evaluator.slice(0, 4)}...${evaluation.evaluator.slice(-4)}`;
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
  } = ReviewDropdownVariants({
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
        {getIcon(evaluation.evaluationStatus)}
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
const ReviewDropdownContent: React.FC<ReviewDropdownContentProps> = ({ evaluation }) => {
  const { content } = ReviewDropdownVariants({ variant: "default" });

  return (
    <div className={cn(content())}>
      <EvaluationSummary evaluation={evaluation} />
      <EvaluationAnswers evaluation={evaluation} />
    </div>
  );
};

// Evaluation Summary Component
const EvaluationSummary: React.FC<ReviewDropdownContentProps> = ({ evaluation }) => {
  const backgroundClass = evaluationSummaryVariants({
    background: evaluation.evaluatorType === "human" ? "default" : "light",
  });

  return (
    <div className={cn(backgroundClass)}>
      <p>{evaluation.summary}</p>
    </div>
  );
};

// Evaluation Answers Component
const EvaluationAnswers: React.FC<ReviewDropdownContentProps> = ({ evaluation }) => {
  return (
    <div className="flex flex-col gap-6">
      {evaluation.evaluation.map((evaluation, index) => (
        <div
          key={index}
          className="flex items-center gap-1 font-sans text-base font-normal leading-7 text-black"
        >
          <span>{getIcon(evaluation.answer)}</span>
          <p>{evaluation.question}</p>
        </div>
      ))}
    </div>
  );
};
export default ReviewDropdown;

const getIcon = (value: string) => {
  const iconMap = {
    approved: IconType.SOLID_CHECK,
    rejected: IconType.SOLID_X,
    uncertain: IconType.SOLID_QUESTION_MARK_CIRCLE,
    YES: IconType.SOLID_CHECK,
    NO: IconType.SOLID_X,
    UNCERTAIN: IconType.SOLID_QUESTION_MARK_CIRCLE,
  };

  const iconType = Object.keys(iconMap).includes(value)
    ? iconMap[value as keyof typeof iconMap]
    : IconType.SOLID_QUESTION_MARK_CIRCLE;

  return <Icon type={iconType} />;
};
