import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { match, P } from "ts-pattern";

export enum Status {
  INPROGRESS = "Active",
  ENDED = "Ended",
  HIDDEN = "Hidden",
}

interface StatusBadgeProps {
  status: `${Status}`;
}

const statusMap = {
  [Status.INPROGRESS]: {
    variant: "InProgress" as const,
    display: "In Progress",
  },
  [Status.ENDED]: {
    variant: "Ended" as const,
    display: "Ended",
  },
  [Status.HIDDEN]: {
    variant: "Hidden" as const,
    display: "",
  },
};

const badgeVariants = cva(
  "ui-inline-flex ui-items-center ui-rounded-full ui-border ui-font-sans ui-text-xs ui-font-semibold ",
  {
    variants: {
      variant: {
        InProgress: "ui-bg-blue-100 ui-px-2.5  ui-py-0.5",
        Ended: "ui-bg-orange-100 ui-px-2.5  ui-py-0.5",
        Hidden: "ui-hidden",
      },
    },
  },
);

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const key: Status = match({ status })
    .with({ status: "Active" }, () => Status.INPROGRESS)
    .with({ status: "In Progress" }, () => Status.INPROGRESS)
    .with({ status: "Ended" }, () => Status.ENDED)
    .otherwise(() => Status.HIDDEN);

  const { variant, display } = statusMap[key];

  return <Badge variant={variant}>{display} </Badge>;
};

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
