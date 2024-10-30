import React from "react";

import { match, P } from "ts-pattern";

import { formatDate, DateFormat } from "@/lib/dates/formatDate";
import { IconType } from "@/primitives/Icon";

import { IconLabelProps } from "./types";
import {
  getEvaluationMessage,
  renderReviewIcons,
  IconLabelContainer,
  getFormattedLink,
  getAddressLabel,
  RenderIcon,
} from "./utils";
import { variants } from "./variants";

export const IconLabel: React.FC<IconLabelProps> = (props) => {
  const { text, icon } = variants();

  return match(props)
    .with({ type: "ai-evaluation" }, ({ percent = 0, className }) => (
      <IconLabelContainer
        type="ai-evaluation"
        className={className}
        iconType={IconType.SPARKLES}
        iconVariant={icon({ type: "ai-evaluation" })}
      >
        <span className={text()}>{getEvaluationMessage(percent)}</span>
      </IconLabelContainer>
    ))
    .with({ type: "date" }, ({ date = new Date(), className }) => (
      <IconLabelContainer
        type="date"
        className={className}
        iconType={IconType.CLOCK}
        iconVariant={icon({ type: "date" })}
      >
        <span className={text()}>{formatDate(date, DateFormat.FullDate24Hour)}</span>
      </IconLabelContainer>
    ))
    .with({ type: "dateWithPrefix" }, ({ date = new Date(), prefix, className }) => (
      <IconLabelContainer
        type="date"
        className={className}
        iconType={IconType.CALENDAR}
        iconVariant={icon({ type: "dateWithPrefix" })}
      >
        <span className={text({ type: "dateWithPrefix" })}>{`${prefix} ${formatDate(
          date,
          DateFormat.FullDate12Hour,
        )}`}</span>
      </IconLabelContainer>
    ))
    .with({ type: "reviews" }, ({ posReviews = 0, negReviews = 0, className }) => {
      const totalReviews = Math.max(0, posReviews) + Math.max(0, negReviews);

      return (
        <IconLabelContainer type="reviews" className={className}>
          <div className="flex items-center">{renderReviewIcons(posReviews, negReviews)}</div>
          <span className={text()}>{`${totalReviews} Reviews`}</span>
        </IconLabelContainer>
      );
    })
    .with({ type: "address" }, ({ address, ens, className }) => {
      const label = getAddressLabel(ens, address);

      return (
        <IconLabelContainer
          type="default"
          className={className}
          iconType={IconType.ETH}
          iconVariant={icon({ type: "default" })}
        >
          <span className={text()}>{label}</span>
        </IconLabelContainer>
      );
    })
    .with({ type: "social" }, ({ platform, link, isVerified = false, className }) => {
      const formattedLink = getFormattedLink(platform, link);
      const iconType = match(platform)
        .with("github", () => IconType.GITHUB)
        .with("twitter", () => IconType.TWITTER)
        .with("website", () => IconType.GLOBE)
        .otherwise(() => IconType.GLOBE);
      return (
        <IconLabelContainer
          type="default"
          className={className}
          iconType={iconType}
          iconVariant={icon({ type: "default" })}
        >
          <a href={link} target="_blank" rel="noreferrer" className={text({ type: "social" })}>
            {formattedLink}
          </a>
          {isVerified && (
            <RenderIcon
              iconType={IconType.VERIFIEDBADGE}
              iconVariant={icon({ type: "verifiedBadge" })}
            />
          )}
        </IconLabelContainer>
      );
    })
    .with({ type: "default" }, ({ iconType, label, className, iconVariant, textVariant }) => (
      <IconLabelContainer
        type="default"
        className={className}
        iconType={iconType}
        iconVariant={iconVariant ?? icon({ type: "default" })}
      >
        <span className={textVariant ?? text({ type: "default" })}>{label}</span>
      </IconLabelContainer>
    ))
    .otherwise(() => (
      <IconLabelContainer
        type="default"
        iconType={IconType.X}
        iconVariant={icon({ type: "default" })}
      >
        <span className={text()}>You haven't selected a type</span>
      </IconLabelContainer>
    ));
};
