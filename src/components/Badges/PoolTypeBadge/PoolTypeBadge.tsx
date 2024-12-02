import * as React from "react";

import { tv } from "tailwind-variants";
import { match, P } from "ts-pattern";

import { cn } from "@/lib/utils";
import { Badge } from "@/primitives";
import { isPoolType, PoolType } from "@/types";

const variants = tv({
  base: "border-transparent",
  variants: {
    value: {
      [PoolType.QuadraticFunding]: "bg-green-100",
      [PoolType.DirectGrants]: "bg-yellow-100",
    },
  },
});

export interface PoolTypeBadgeProps {
  value?: PoolType;
  className?: string;
}

const badgeTexts = {
  [PoolType.QuadraticFunding]: "Quadratic funding",
  [PoolType.DirectGrants]: "Direct grants",
};

const invalidValueText = "Error: Invalid type";

export const PoolTypeBadge: React.FC<PoolTypeBadgeProps> = ({ value, className }) => {
  const variantClass = variants({ value });

  return match({ value })
    .with({ value: undefined }, () => <Badge skeleton className={className} size="md" />)
    .with({ value: P.when(isPoolType) }, ({ value }) => (
      <Badge className={cn(className, variantClass)}>{badgeTexts[value]}</Badge>
    ))
    .otherwise(() => <Badge variant="outlined-error">{invalidValueText}</Badge>);
};
