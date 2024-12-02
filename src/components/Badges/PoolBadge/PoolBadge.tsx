import * as React from "react";

import { match, P } from "ts-pattern";

import { Badge } from "@/primitives";
import { isPoolStatus, isPoolType, PoolStatus, PoolType } from "@/types";

import { PoolStatusBadge } from "../PoolStatusBadge";
import { PoolTypeBadge } from "../PoolTypeBadge";

export interface PoolBadgeProps {
  type: "poolStatus" | "poolType";
  badge?: PoolStatus | PoolType;
  className?: string;
}

export const PoolBadge: React.FC<PoolBadgeProps> = ({ type, badge, className }) => {
  return match({ type, badge })
    .with({ type: "poolStatus", badge: P.optional(P.when(isPoolStatus)) }, () => (
      <PoolStatusBadge className={className} value={badge as PoolStatus} />
    ))
    .with({ type: "poolType", badge: P.optional(P.when(isPoolType)) }, () => (
      <PoolTypeBadge className={className} value={badge as PoolType} />
    ))
    .otherwise(() => <Badge variant="outlined-error">Error: Invalid badge type</Badge>);
};
