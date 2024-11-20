import { Accordion } from "@/primitives/Accordion";

// Header Component
const ReviewSummaryHeader: React.FC = () => {
  return (
    <div style={headerStyles}>
      <div style={headerLeftStyles}>
        Icon
        {/* <IconComponent /> Replace with the actual Icon component */}
        <div>
          <div style={textRowStyle}>Row 1 Text</div>
          <div style={textRowStyle}>Row 2 Text</div>
        </div>
      </div>
      <div style={headerRightStyles}>
        Status
        {/* <StatusComponent /> Replace with the actual Status component */}
      </div>
    </div>
  );
};

// Content Component
const ReviewSummaryContent: React.FC = () => {
  return (
    <div style={contentStyles}>
      <p>Content row 1</p>
      <p>Content row 2</p>
      {/* Add more content rows as needed */}
    </div>
  );
};

// Main Component
const ReviewSummary: React.FC<null> = () => {
  return (
    <Accordion
      border="md"
      variant="light"
      header={<ReviewSummaryHeader />}
      content={<ReviewSummaryContent />}
    />
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
