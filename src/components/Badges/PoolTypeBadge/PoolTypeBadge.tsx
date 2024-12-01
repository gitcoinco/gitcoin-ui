import * as React from "react";

import { tv } from "tailwind-variants";

import { cn } from "@/lib/utils";
import { Badge } from "@/primitives";
import { PoolType } from "@/types";

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

const typeBadgeTexts = {
  [PoolType.QuadraticFunding]: "Quadratic funding",
  [PoolType.DirectGrants]: "Direct grants",
};

export const PoolTypeBadge: React.FC<PoolTypeBadgeProps> = ({ value, className }) => {
  const typeVariant = variants({ value });

  return value ? (
    <Badge className={cn(className, typeVariant)}>{typeBadgeTexts[value]}</Badge>
  ) : (
    <Badge skeleton className={className} size="md" />
  );
};
