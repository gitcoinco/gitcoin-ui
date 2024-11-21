import * as React from "react";

import { tv, type VariantProps } from "tailwind-variants";

import { IconLabel } from "@/components/IconLabel";
import { SocialProps } from "@/components/IconLabel/types";
import { cn } from "@/lib/utils";

const labelListVariants = tv({
  slots: {
    container: "flex flex-col gap-4",
    text: "font-sans text-[16px]/[24px] font-normal",
    iconContainer: "flex flex-wrap items-start gap-10",
    column: "flex flex-col gap-4",
  },
});

// Main ProjectLabelList Component
interface ProjectLabelListProps {
  description: string;
  socialLinks: {
    link: string;
    platform: SocialProps["platform"];
    isVerified?: boolean;
  }[];
  address?: string;
  dateInfo?: {
    date: Date;
    prefix: string;
  };
}

export const ProjectLabelList: React.FC<ProjectLabelListProps> = ({
  description,
  socialLinks,
  address,
  dateInfo,
}) => {
  const { container, text, iconContainer, column } = labelListVariants();

  return (
    <div className={cn(container)}>
      <span className={cn(text)}>{description}</span>
      <div className={cn(iconContainer)}>
        <div className={cn(column)}>
          {address && <IconLabel ens={address} type="address" />}
          {socialLinks.map((social, index) => (
            <IconLabel
              key={index}
              link={social.link}
              platform={social.platform}
              type={"social"}
              isVerified={social.isVerified}
            />
          ))}
        </div>
        <div className={cn(column)}>
          {dateInfo && (
            <IconLabel date={dateInfo.date} prefix={dateInfo.prefix} type="dateWithPrefix" />
          )}
        </div>
      </div>
    </div>
  );
};
