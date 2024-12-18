import * as React from "react";
import { tv } from "tailwind-variants";

const metricCardVariants = tv({
  slots: {
    base: "flex w-[720px] flex-col items-start justify-center gap-6 rounded-lg border border-grey-200 bg-white px-10 py-6",
    content: "flex w-full items-start justify-between",
    leftSection: "flex w-2/3 flex-col gap-4",
    heading: "font-ui-sans text-lg font-bold text-text-primary",
    paragraph: "line-clamp-3 h-20 font-ui-sans text-base font-normal leading-relaxed text-text-secondary",
    buttonContainer: "flex justify-end",
    bottomLeftSection: "flex w-full items-center font-sans text-sm font-normal text-text-secondary",
  },
});

export interface MetricCardProps {
  heading: string;
  paragraph: string;
  button: React.ReactNode;
  bottomSection: React.ReactNode;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  heading,
  paragraph,
  button,
  bottomSection,
  className,
}) => {
  // Get the slots from the variants
  const {
    base,
    content,
    leftSection,
    heading: headingClass,
    paragraph: paragraphClass,
    buttonContainer,
    bottomLeftSection,
  } = metricCardVariants();

  return (
    <div className={`${base()} ${className}`}>
      <div className={content()}>
        <div className={leftSection()}>
          <h3 className={headingClass()}>{heading}</h3>
          <div className={paragraphClass()}>{paragraph}</div>
        </div>
         <div className={buttonContainer()}>{button}</div>
      </div>

      {/* Bottom Left Section */}
      <div className={bottomLeftSection()}>{bottomSection}</div>
    </div>
  );
};