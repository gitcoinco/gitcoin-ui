import React from "react";

import { match } from "ts-pattern";

import { formatDate, DateFormat } from "@/lib/dates/formatDate";
import { getAddressLabel } from "@/lib/utils";
import { IconType } from "@/primitives/Icon";

import { IconLabelProps } from "./types";
import { getEvaluation, IconLabelContainer, getFormattedLink, RenderIcon } from "./utils";
import { variants } from "./variants";

export const IconLabel: React.FC<IconLabelProps> = (props) => {
  const { text, icon } = variants();

  return match(props)
    .with({ type: "ai-evaluation" }, ({ percent = 0, className }) => {
      const { message, variant } = getEvaluation(percent) as keyof typeof icon;

      return (
        <IconLabelContainer
          type="ai-evaluation-a"
          className={className}
          iconType={IconType.SPARKLES}
          iconVariant={icon({ type: variant })}
        >
          <span className={text()}>{message}</span>
        </IconLabelContainer>
      );
    })

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
    .with({ type: "period" }, ({ startDate = new Date(), endDate = new Date(), className }) => (
      <IconLabelContainer
        type="period"
        className={className}
        iconType={IconType.CALENDAR}
        iconVariant={icon({ type: "dateWithPrefix" })}
      >
        <span className={text({ type: "dateWithPrefix" })}>{`${formatDate(
          startDate,
          DateFormat.ShortMonthDayYear,
        )} - ${formatDate(endDate, DateFormat.ShortMonthDayYear)}`}</span>
      </IconLabelContainer>
    ))
    .with({ type: "roundPeriod" }, ({ startDate = new Date(), endDate = undefined, className }) => (
      <IconLabelContainer
        type="period"
        className={className}
        iconType={IconType.CLOCK}
        iconVariant={icon({ type: "roundPeriod" })}
      >
        <span className={text({ type: "roundPeriod" })}>{`Review period: ${formatDate(
          startDate,
          DateFormat.ShortMonthDayYear24HourUTC,
        )} - ${
          endDate
            ? formatDate(endDate, DateFormat.ShortMonthDayYear24HourUTC)
            : "No end date (open round)"
        }`}</span>
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
