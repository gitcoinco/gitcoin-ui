import { IconLabel } from "@/components/IconLabel";
import { capitalizeWord, shortAddress } from "@/lib/utils";
import { IconType } from "@/primitives/Icon";
import { ListGrid, ListGridColumn } from "@/primitives/ListGrid";

import { Evaluation } from "../../services/checker";

export interface EvaluationListProps {
  evaluations: Evaluation[];
}

export const EvaluationList = ({ evaluations }: EvaluationListProps) => {
  const columns: ListGridColumn<Evaluation>[] = [
    {
      header: "Date",
      key: "lastUpdatedAt",
      width: "1fr",
      render: (item) => <IconLabel type="date" date={new Date(item.lastUpdatedAt)} />,
    },
    {
      header: "Reviewer",
      key: "reviewer",
      width: "1fr",
      position: "center",
      render: (item) => (
        <div className="flex items-center justify-center">
          <p>{item.evaluator === "HUMAN" ? shortAddress(item.evaluator) : "ChatGPT"}</p>
        </div>
      ),
    },
    {
      header: "Score",
      key: "evaluatorScore",
      width: "1fr",
      position: "center",
      render: (item) => (
        <div className="flex items-center justify-center">
          <p>{item.evaluatorScore}%</p>
        </div>
      ),
    },
    {
      header: "Status",
      key: "evaluatorStatus",
      width: "1fr",
      position: "center",
      render: (item) => {
        const icon =
          item.evaluationStatus === "APPROVED"
            ? IconType.CHECK
            : item.evaluationStatus === "PENDING"
              ? IconType.EXCLAMATION_CIRCLE
              : IconType.X;

        const className =
          item.evaluationStatus === "APPROVED"
            ? "text-moss-700"
            : item.evaluationStatus === "PENDING"
              ? "text-yellow-700"
              : "text-red-700";

        return (
          <div className="flex items-center justify-center">
            <IconLabel
              className={className}
              type="default"
              iconVariant="success"
              iconType={icon}
              label={capitalizeWord(item.evaluationStatus)}
            />
          </div>
        );
      },
    },
  ];
  return (
    <ListGrid
      data={evaluations}
      columns={columns}
      rowClassName="h-[72px]"
      getRowKey={(item: Evaluation) => item.evaluator}
    />
  );
};
