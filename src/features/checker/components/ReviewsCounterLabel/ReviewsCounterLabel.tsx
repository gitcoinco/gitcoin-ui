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
  posReviews?: number;
  negReviews?: number;
  className?: string;
}

export const ReviewsCounterLabel: React.FC<ReviewsCounterLabelProps> = ({
  posReviews = 0,
  negReviews = 0,
  className,
}) => {
  const { text, container } = variants();

  const totalReviews = Math.max(0, posReviews) + Math.max(0, negReviews);

  return (
    <div className={cn(container(), className)}>
      <ReviewIconGroup positiveReviews={posReviews} negativeReviews={negReviews} />
      <span className={text()}>
        {totalReviews ? `${totalReviews} Review${totalReviews > 1 ? "s" : ""}` : "Needs review"}
      </span>
    </div>
  );
};
