import { IconLabel } from "@/components/IconLabel";
import { CircleStat } from "@/primitives/Indicators";
import { ListGrid, ListGridColumn } from "@/primitives/ListGrid";

import { EvaluationAction, ProjectReview, ProjectStatus } from "~checker/types";
import { getReviewsCount } from "~checker/utils/getReviewsCount";

import { ProjectEvaluationAction } from "../ProjectEvaluationAction";
import { ReviewsCounterLabel } from "../ReviewsCounterLabel";

export interface ProjectEvaluationListProps {
  evaluationStatus?: ProjectStatus;
  projects: ProjectReview[];
  action: (projectId: string, action: EvaluationAction) => void;
}

export const ProjectEvaluationList = ({
  evaluationStatus = "pending",
  projects,
  action,
}: ProjectEvaluationListProps) => {
  const columns: ListGridColumn<ProjectReview>[] = [
    {
      header: "Project",
      key: "project",
      width: "2fr",
      render: (item) => (
        <div className="flex items-center gap-4">
          <img
            src={item.avatarUrl}
            alt={item.name}
            className="aspect-square size-12 rounded-sm"
            onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) => {
              event.currentTarget.src = "/images/grey-image.png";
            }}
          />
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
        return <ReviewsCounterLabel positiveReviews={nApproved} negativeReviews={nRejected} />;
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
          <CircleStat value={item.scoreAverage.toFixed(1)} />
        </div>
      ),
    },
    {
      header: "Action",
      key: "action",
      width: "2fr",
      position: "center",
      render: (item) => {
        return (
          <div className="flex items-center justify-center">
            <ProjectEvaluationAction
              onEvaluate={action}
              projectId={item.id}
              status={evaluationStatus}
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
