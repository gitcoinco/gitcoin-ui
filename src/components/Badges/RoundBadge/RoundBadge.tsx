import * as React from "react";

import { tv } from "tailwind-variants";
import { match } from "ts-pattern";

import { Badge } from "@/primitives/Badge/Badge";

export enum RoundStatus {
  PreRound = "PreRound",
  RoundInProgress = "RoundInProgress",
  ApplicationsInProgress = "ApplicationsInProgress",
  FundingPending = "FundingPending",
}

export enum RoundType {
  QuadraticFunding = "QuadraticFunding",
  DirectGrants = "DirectGrants",
}

export const RoundBadgeVariants = tv({
  variants: {
    variant: {
      "pre-round": "border border-green-400 bg-white text-green-400",
      "round-in-progress": "border-transparent bg-green-200 text-black",
      "applications-in-progress": "border-transparent bg-blue-100",
      "funding-pending": "border border-red-400 bg-white text-red-400",
      "quadratic-funding": "border-transparent bg-green-100",
      "direct-grants": "border-transparent bg-yellow-100",
    },
  },
});

type RoundBadgeProps =
  | { type: "roundStatus"; badge: RoundStatus }
  | { type: "roundType"; badge: RoundType };

export const RoundBadge: React.FC<RoundBadgeProps> = (props) => {
  const { variant, text } = match(props)
    .with({ type: "roundStatus", badge: RoundStatus.PreRound }, () => ({
      variant: RoundBadgeVariants({ variant: "pre-round" }),
      text: "Pre round",
    }))
    .with({ type: "roundStatus", badge: RoundStatus.RoundInProgress }, () => ({
      variant: RoundBadgeVariants({ variant: "round-in-progress" }),
      text: "Round in progress",
    }))
    .with({ type: "roundStatus", badge: RoundStatus.ApplicationsInProgress }, () => ({
      variant: RoundBadgeVariants({ variant: "applications-in-progress" }),
      text: "Applications in progress",
    }))
    .with({ type: "roundStatus", badge: RoundStatus.FundingPending }, () => ({
      variant: RoundBadgeVariants({ variant: "funding-pending" }),
      text: "Funding pending",
    }))
    .with({ type: "roundType", badge: RoundType.QuadraticFunding }, () => ({
      variant: RoundBadgeVariants({ variant: "quadratic-funding" }),
      text: "Quadratic funding",
    }))
    .with({ type: "roundType", badge: RoundType.DirectGrants }, () => ({
      variant: RoundBadgeVariants({ variant: "direct-grants" }),
      text: "Direct grants",
    }))
    .otherwise(() => ({
      variant: "border border-red-400 bg-white text-red-400",
      text: "Error: Invalid badge type",
    }));

  return <Badge className={variant}>{text}</Badge>;
};
