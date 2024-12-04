import { Address } from "viem";

import { DefaultLogo } from "@/assets";
import { IconLabel } from "@/components/IconLabel";
import { addressFrom } from "@/lib";
import { Button } from "@/primitives/Button";
import { CircleStat } from "@/primitives/Indicators";
import { ListGrid, ListGridColumn } from "@/primitives/ListGrid";

import { ProjectReview } from "~checker/types";
import { getReviewsCount } from "~checker/utils/getReviewsCount";

import { ReviewsCounterLabel } from "../ReviewsCounterLabel";

export interface ProjectReviewListProps {
  projects: ProjectReview[];

  reviewer?: Address;
  isPoolManager?: boolean;
  action?: (projectId: string) => void;
  actionLabel?: string;
  keepAction?: boolean;
}

export const ProjectReviewList = ({
  reviewer,
  isPoolManager,
  projects,
  action,
  actionLabel,
  keepAction,
}: ProjectReviewListProps) => {
  const columns: ListGridColumn<ProjectReview>[] = [
    {
      header: "Project",
      key: "project",
      width: "1.8fr",
      render: (item) => (
        <div className="flex items-center gap-4">
          <img
            src={item.avatarUrl}
            alt={item.name}
            className="aspect-square size-12 rounded-sm"
            onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) => {
              event.currentTarget.src = DefaultLogo;
            }}
          />
          <span>{item.name}</span>
        </div>
      ),
    },
    {
      header: "Date Submitted",
      key: "date",
      width: "1.3fr",
      render: (item) => <IconLabel type="date" date={item.date} />,
    },
    {
      header: "Reviews",
      key: "reviews",
      width: "1.2fr",
      render: (item) => {
        const { nApproved, nRejected } = getReviewsCount(item.reviews);
        return <ReviewsCounterLabel positiveReviews={nApproved} negativeReviews={nRejected} />;
      },
    },
    {
      header: "AI Suggestion",
      key: "aiSuggestion",
      width: "0.9fr",
      render: (item) => {
        // addressFrom(1) === ai evaluator
        return item.reviews.some((review) => review.reviewer === addressFrom(1)) ? (
          <IconLabel type="ai-evaluation" percent={item.aiSuggestion} />
        ) : (
          <ReviewsCounterLabel negativeReviews={0} positiveReviews={0} />
        );
      },
    },
    {
      header: "Score Average",
      key: "scoreAverage",
      width: "0.8fr",
      position: "center",
      render: (item) => (
        <div className="flex items-center justify-center">
          <CircleStat value={item.scoreAverage.toFixed(0)} />
        </div>
      ),
    },
    {
      header: "Action",
      key: "action",
      width: "1fr",
      position: "center",
      render: (item) => {
        const isReviewed = item.reviews.some((review) => review.reviewer === reviewer);
        const isDisabled = !keepAction && (!isPoolManager || isReviewed);
        const defaultActionLabel = isReviewed ? "View evaluation" : "Evaluate project";
        return (
          <div className="flex items-center justify-center">
            <Button
              variant={isDisabled ? "disabled" : "subtle"}
              value={actionLabel ?? defaultActionLabel}
              disabled={!isPoolManager}
              onClick={() => {
                if (action) {
                  action(item.id);
                }
              }}
            />
          </div>
        );
      },
    },
  ];
  return (
    <ListGrid
      data={projects}
      columns={columns}
      rowClassName="h-[72px]"
      getRowKey={(item: ProjectReview) => item.id.toString()}
    />
  );
};
