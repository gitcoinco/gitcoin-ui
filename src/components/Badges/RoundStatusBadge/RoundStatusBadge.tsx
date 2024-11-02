import * as React from "react";

import { match } from "ts-pattern";

import { Badge, badgeVariants } from "@/primitives/Badge/Badge";

export type RoundStatusBadgeVariants = typeof badgeVariants.variants.variant;

export enum RoundStatus {
  PreRound = "PreRound",
  RoundInProgress = "RoundInProgress",
  ApplicationsInProgress = "ApplicationsInProgress",
  FundingPending = "FundingPending",
}

export interface RoundStatusBadgeProps {
  roundStatus: RoundStatus;
}

export const RoundStatusBadge: React.FC<RoundStatusBadgeProps> = ({ roundStatus }) => {
  return match(roundStatus)
    .with(RoundStatus.PreRound, () => <Badge variant="green/400">Pre round</Badge>)
    .with(RoundStatus.RoundInProgress, () => <Badge variant="green/200">Round in progress</Badge>)
    .with(RoundStatus.ApplicationsInProgress, () => (
      <Badge variant="blue/100">Applications in progress</Badge>
    ))
    .with(RoundStatus.FundingPending, () => <Badge variant="orange/400">Funding pending</Badge>)
    .exhaustive();
};
