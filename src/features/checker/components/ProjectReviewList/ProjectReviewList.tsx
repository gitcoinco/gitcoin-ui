import { IconLabel } from "@/components/IconLabel";
import { Avatar } from "@/primitives/Avatar";
import { Button } from "@/primitives/Button";
import { CircleStat } from "@/primitives/Indicators";
import { ListGrid, ListGridColumn } from "@/primitives/ListGrid";

import { getReviewsCount } from "../../utils/getReviewsCount";
import { ProjectReview } from "./types";

export interface ProjectReviewListProps {
  reviewer: `0x${string}`;
  projects: ProjectReview[];
}

export const ProjectReviewList = ({ reviewer, projects }: ProjectReviewListProps) => {
  const columns: ListGridColumn<ProjectReview>[] = [
    {
      header: "Project",
      key: "project",
      width: "2fr",
      render: (item) => (
        // <div>

        // <Avatar avatarClassName="rounded-sm w-24" url={item.avatarUrl} />
        // </div>
        <div className="flex items-center gap-4">
          <Avatar avatarClassName="rounded-sm w-14 " url={item.avatarUrl} />
          <span>{item.name}</span>
        </div>
      ),
    },
    {
      header: "Date Submitted",
      key: "date",
      width: "1fr",
      render: (item) => <IconLabel type="date" date={item.date} />,
    },
    {
      header: "Reviews",
      key: "reviews",
      width: "1fr",
      render: (item) => {
        const { nApproved, nRejected } = getReviewsCount(item.reviews);
        return <IconLabel type="reviews" posReviews={nApproved} negReviews={nRejected} />;
      },
    },
    {
      header: "AI Suggestion",
      key: "aiSuggestion",
      width: "1fr",
      render: (item) => <IconLabel type="ai-evaluation" percent={item.aiSuggestion} />,
    },
    {
      header: "Score Average",
      key: "scoreAverage",
      width: "1fr",
      position: "center",
      render: (item) => (
        <div className="flex items-center justify-center">
          <CircleStat value={item.scoreAverage} />
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
        return (
          <div className="flex items-center justify-center">
            <Button variant="secondary" value="Evaluate project" disabled={isReviewed} />
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
