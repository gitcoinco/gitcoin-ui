import React from "react";

import { tv } from "tailwind-variants";

import { cn } from "@/lib/utils";

import { ReviewIconGroup } from "./components/ReviewIconGroup";

const variants = tv({
  slots: {
    container: "flex items-center gap-2",
    text: "truncate text-[16px]/[24px]",
  },
});

interface ReviewsCounterLabelProps {
  positiveReviews?: number;
  negativeReviews?: number;
  className?: string;
}

export const ReviewsCounterLabel: React.FC<ReviewsCounterLabelProps> = ({
  positiveReviews = 0,
  negativeReviews = 0,
  className,
}) => {
  const { text, container } = variants();

  const totalReviews = Math.max(0, positiveReviews) + Math.max(0, negativeReviews);

  return (
    <div className={cn(container(), className)}>
      <ReviewIconGroup positiveReviews={positiveReviews} negativeReviews={negativeReviews} />
      <span className={text()}>
        {totalReviews ? `${totalReviews} Review${totalReviews > 1 ? "s" : ""}` : "Needs review"}
      </span>
    </div>
  );
};
