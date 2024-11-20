import { Accordion } from "@/primitives/Accordion";
import { Icon, IconType } from "@/primitives/Icon";

import { EvaluationSummaryProps } from "./types";

interface ReviewSummaryContentProps {
  evaluation: EvaluationSummaryProps;
}

// Main Component
const ReviewSummary: React.FC<ReviewSummaryContentProps> = ({ evaluation }) => {
  return (
    <Accordion
      border="md"
      variant="light"
      header={<ReviewSummaryHeader evaluation={evaluation} />}
      content={<ReviewSummaryContent evaluation={evaluation} />}
    />
  );
};

// Header Component
const ReviewSummaryHeader: React.FC<ReviewSummaryContentProps> = ({ evaluation }) => {
  const evaluatorIconType = evaluation.evaluatorType === "human" ? IconType.USER : IconType.SHINE;

  return (
    <div style={headerStyles}>
      <div style={headerLeftStyles}>
        <Icon type={evaluatorIconType} />
        <div>
          <p>
            Review by
            <span>{evaluation.evaluator}</span>
          </p>
          <p>Reviewed on {evaluation.lastUpdatedAt}</p>
        </div>
      </div>
      <div style={headerRightStyles}>
        <Icon type={IconType.SOLID_CHECK} />
        <p>3/5</p>
        Status
        <p>{evaluation.status}</p>
        {/* <StatusComponent /> Replace with the actual Status component */}
      </div>
    </div>
  );
};

const EvaluationSummary: React.FC<ReviewSummaryContentProps> = ({ evaluation }) => {
  return <div></div>;
};

const EvaluationAnswers: React.FC<ReviewSummaryContentProps> = ({ evaluation }) => {
  return <div></div>;
};

// Content Component
const ReviewSummaryContent: React.FC<ReviewSummaryContentProps> = ({ evaluation }) => {
  return (
    <div style={contentStyles}>
      <EvaluationSummary evaluation={evaluation} />
      <EvaluationAnswers evaluation={evaluation} />
    </div>
  );
};

export default ReviewSummary;

// Styles
const headerStyles: React.CSSProperties = {
  display: "flex",
  padding: "32px 48px",
  justifyContent: "space-between", // Ensures maximum space between left and right
  alignItems: "center",
  alignSelf: "stretch",
};

const headerLeftStyles: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const headerRightStyles: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
};

const textRowStyle: React.CSSProperties = {
  lineHeight: "1.5",
};

const contentStyles: React.CSSProperties = {
  display: "flex",
  width: "1279px",
  padding: "32px 48px 48px 48px",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "24px",
};
