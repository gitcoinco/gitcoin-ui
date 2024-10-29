import { ListGrid, ListGridColumn } from "@/primitives/ListGrid/ListGrid";

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
      render: (item) => <span>{item.name}</span>, // TODO: Add project avatar
    },
    {
      header: "Date Submitted",
      key: "date",
      render: (item) => <span>{item.date.toLocaleDateString()}</span>,
    },
    {
      header: "Reviews",
      key: "reviews",
      render: (item) => <span>{item.reviews.length}</span>,
    },
    {
      header: "AI Suggestion",
      key: "aiSuggestion",
      render: (item) => <span>{item.aiSuggestion}</span>,
    },
    {
      header: "Score Average",
      key: "scoreAverage",
      render: (item) => <span>{item.scoreAverage}</span>,
    },
    {
      header: "Action",
      key: "action",
      render: (item) =>
        item.reviews.find((review) => review.reviewer === reviewer) ? (
          <span>IsReviewed</span>
        ) : (
          <span>Review</span>
        ),
    },
  ];
  return (
    <ListGrid
      data={projects}
      columns={columns}
      getRowKey={(item: ProjectReview) => item.id.toString()}
    />
  );
};
