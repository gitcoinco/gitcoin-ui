import * as React from "react";

import { match } from "ts-pattern";

import { Badge, badgeVariants } from "@/primitives/Badge/Badge";

export type RoundTypeBadgeVariants = typeof badgeVariants.variants.variant;

export enum RoundType {
  QuadraticFunding = "QuadraticFunding",
  DirectGrants = "DirectGrants",
}

export interface RoundTypeBadgeProps {
  roundType: RoundType;
}

export const RoundTypeBadge: React.FC<RoundTypeBadgeProps> = ({ roundType }) => {
  return match(roundType)
    .with(RoundType.QuadraticFunding, () => <Badge variant="green/100">Quadratic funding</Badge>)
    .with(RoundType.DirectGrants, () => <Badge variant="yellow/100">Direct grants</Badge>)
    .exhaustive();
};
