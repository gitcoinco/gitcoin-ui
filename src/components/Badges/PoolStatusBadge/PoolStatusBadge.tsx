import * as React from "react";

import { tv } from "tailwind-variants";
import { match, P } from "ts-pattern";

import { cn } from "@/lib/utils";
import { Badge } from "@/primitives";
import { isPoolStatus, PoolStatus } from "@/types";

const variants = tv({
  variants: {
    value: {
      [PoolStatus.PreRound]: "border border-green-400 bg-white text-green-400",
      [PoolStatus.RoundInProgress]: "border-transparent bg-green-200 text-black",
      [PoolStatus.ApplicationsInProgress]: "border-transparent bg-blue-100",
      [PoolStatus.FundingPending]: "border border-red-400 bg-white text-red-400",
    },
  },
});

const badgeTexts = {
  [PoolStatus.PreRound]: "Pre round",
  [PoolStatus.RoundInProgress]: "Round in progress",
  [PoolStatus.ApplicationsInProgress]: "Applications in progress",
  [PoolStatus.FundingPending]: "Funding pending",
};

const invalidValueText = "Error: Invalid status";

export interface PoolStatusBadgeProps {
  value?: PoolStatus;
  className?: string;
}

export const PoolStatusBadge: React.FC<PoolStatusBadgeProps> = ({ value, className }) => {
  const variantClass = variants({ value });

  return match({ value })
    .with({ value: undefined }, () => <Badge skeleton className={className} size="md" />)
    .with({ value: P.when(isPoolStatus) }, ({ value }) => (
      <Badge className={cn(className, variantClass)}>{badgeTexts[value]}</Badge>
    ))
    .otherwise(() => <Badge variant="outlined-error">{invalidValueText}</Badge>);
};
