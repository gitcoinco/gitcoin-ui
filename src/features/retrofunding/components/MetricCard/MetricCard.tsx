import * as React from "react";

import { tv } from "tailwind-variants";

import { Button, Icon, IconType } from "@/primitives";

const metricCardVariants = tv({
  slots: {
    base: "flex w-[720px] flex-col items-start justify-center gap-6 rounded-lg border border-grey-200 bg-white px-10 py-6",
    content: "flex w-full items-start justify-between",
    leftSection: "flex w-2/3 flex-col gap-4",
    heading: "font-ui-sans text-lg font-bold text-text-primary",
    paragraph:
      "line-clamp-3 h-20 font-ui-sans text-base font-normal leading-relaxed text-text-secondary",
    buttonContainer: "flex justify-end",
    bottomLeftSection: "flex w-full cursor-pointer items-center font-sans text-sm font-normal text-text-secondary hover:opacity-85",
  },
});

export interface MetricCardProps {
  title: string;
  description: string;
  variant?: "addMetric" | "addToBallot" | "addedToBallot";
  onClick: () => void;
  onReadMore: () => void;
  customButton?: React.ReactNode;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  description,
  variant = "addMetric",
  onClick,
  onReadMore,
  customButton,
  className,
}) => {
  const {
    base,
    content,
    leftSection,
    heading: headingClass,
    paragraph: paragraphClass,
    buttonContainer,
    bottomLeftSection,
  } = metricCardVariants();

  const renderButton = () => {
    if (customButton) {
      return customButton;
    }

    let buttonText = "";
    let buttonIcon: React.ReactNode = null;
    let buttonVariant = "secondary";

    switch (variant) {
      case "addMetric":
        buttonText = "Add metric";
        buttonIcon = <Icon className="size-4" type={IconType.PLUS} />;
        buttonVariant = "secondary";
        break;
      case "addToBallot":
        buttonText = "Add to ballot";
        buttonIcon = <Icon className="size-4" type={IconType.PLUS} />;
        buttonVariant = "light-purple";
        break;
      case "addedToBallot":
        buttonText = "Added to ballot";
        buttonIcon = <Icon className="size-4" type={IconType.CHECK} />;
        buttonVariant = "light-green";
        break;
    }

    return (
      <Button
        icon={buttonIcon}
        iconPosition="left"
        variant={buttonVariant}
        value={buttonText}
        onClick={onClick}
      />
    );
  };

  return (
    <div className={`${base()} ${className}`}>
      <div className={content()}>
        <div className={leftSection()}>
          <h3 className={headingClass()}>{title}</h3>
          <div className={paragraphClass()}>{description}</div>
        </div>
        <div className={buttonContainer()}>{renderButton()}</div>
      </div>
      <div className={bottomLeftSection()} onClick={onReadMore}>
        Read more
      </div>
    </div>
  );
};
