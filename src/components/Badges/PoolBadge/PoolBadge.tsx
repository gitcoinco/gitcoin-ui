import * as React from "react";

import { tv } from "tailwind-variants";
import { match } from "ts-pattern";

import { cn } from "@/lib/utils";
import { Badge } from "@/primitives";
import { PoolStatus, PoolType } from "@/types";

const PoolBadgeVariants = tv({
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

export interface PoolStatusBadgeProps {
  type: "poolStatus";
  badge: PoolStatus;
  className?: string;
}

export interface PoolTypeBadgeProps {
  type: "poolType";
  badge: PoolType;
  className?: string;
}

export type PoolBadgeProps = PoolStatusBadgeProps | PoolTypeBadgeProps;

export const PoolBadge: React.FC<PoolBadgeProps> = (props) => {
  const { variant, text } = match(props)
    .with({ type: "poolStatus", badge: PoolStatus.PreRound }, () => ({
      variant: PoolBadgeVariants({ variant: "pre-round" }),
      text: "Pre round",
    }))
    .with({ type: "poolStatus", badge: PoolStatus.RoundInProgress }, () => ({
      variant: PoolBadgeVariants({ variant: "round-in-progress" }),
      text: "Round in progress",
    }))
    .with({ type: "poolStatus", badge: PoolStatus.ApplicationsInProgress }, () => ({
      variant: PoolBadgeVariants({ variant: "applications-in-progress" }),
      text: "Applications in progress",
    }))
    .with({ type: "poolStatus", badge: PoolStatus.FundingPending }, () => ({
      variant: PoolBadgeVariants({ variant: "funding-pending" }),
      text: "Funding pending",
    }))
    .with({ type: "poolType", badge: PoolType.QuadraticFunding }, () => ({
      variant: PoolBadgeVariants({ variant: "quadratic-funding" }),
      text: "Quadratic funding",
    }))
    .with({ type: "poolType", badge: PoolType.DirectGrants }, () => ({
      variant: PoolBadgeVariants({ variant: "direct-grants" }),
      text: "Direct grants",
    }))
    .otherwise(() => ({
      variant: "border border-red-400 bg-white text-red-400",
      text: "Error: Invalid badge type",
    }));

  return <Badge className={cn(props.className, variant)}>{text}</Badge>;
};
