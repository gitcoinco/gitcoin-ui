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

export const PoolBadgeVariants = tv({
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

type PoolBadgeProps =
  | { type: "roundStatus"; badge: RoundStatus }
  | { type: "roundType"; badge: RoundType };

export const PoolBadge: React.FC<PoolBadgeProps> = (props) => {
  const { variant, text } = match(props)
    .with({ type: "roundStatus", badge: RoundStatus.PreRound }, () => ({
      variant: PoolBadgeVariants({ variant: "pre-round" }),
      text: "Pre round",
    }))
    .with({ type: "roundStatus", badge: RoundStatus.RoundInProgress }, () => ({
      variant: PoolBadgeVariants({ variant: "round-in-progress" }),
      text: "Round in progress",
    }))
    .with({ type: "roundStatus", badge: RoundStatus.ApplicationsInProgress }, () => ({
      variant: PoolBadgeVariants({ variant: "applications-in-progress" }),
      text: "Applications in progress",
    }))
    .with({ type: "roundStatus", badge: RoundStatus.FundingPending }, () => ({
      variant: PoolBadgeVariants({ variant: "funding-pending" }),
      text: "Funding pending",
    }))
    .with({ type: "roundType", badge: RoundType.QuadraticFunding }, () => ({
      variant: PoolBadgeVariants({ variant: "quadratic-funding" }),
      text: "Quadratic funding",
    }))
    .with({ type: "roundType", badge: RoundType.DirectGrants }, () => ({
      variant: PoolBadgeVariants({ variant: "direct-grants" }),
      text: "Direct grants",
    }))
    .otherwise(() => ({
      variant: "border border-red-400 bg-white text-red-400",
      text: "Error: Invalid badge type",
    }));

  return <Badge className={variant}>{text}</Badge>;
};
