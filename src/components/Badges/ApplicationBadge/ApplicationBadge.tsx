import * as React from "react";

import { tv } from "tailwind-variants";
import { match } from "ts-pattern";

import { Badge } from "@/primitives/Badge/Badge";

export enum ApplicationStatus {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
}

export const ApplicationBadgeVariants = tv({
  variants: {
    variant: {
      pending: "border-transparent bg-yellow-100 text-black",
      approved: "border-transparent bg-green-100 text-black",
      rejected: "border-transparent bg-red-100 text-black",
    },
  },
});

interface ApplicationBadgeProps {
  status: ApplicationStatus;
}

export const ApplicationBadge: React.FC<ApplicationBadgeProps> = (props) => {
  const { variant, text } = match(props)
    .with({ status: ApplicationStatus.Pending }, () => ({
      variant: ApplicationBadgeVariants({ variant: "pending" }),
      text: "Pending",
    }))
    .with({ status: ApplicationStatus.Approved }, () => ({
      variant: ApplicationBadgeVariants({ variant: "approved" }),
      text: "Approved",
    }))
    .with({ status: ApplicationStatus.Rejected }, () => ({
      variant: ApplicationBadgeVariants({ variant: "rejected" }),
      text: "Rejected",
    }))

    .otherwise(() => ({
      variant: "border border-red-400 bg-white text-red-400",
      text: "Error: Invalid Application Status",
    }));

  return <Badge className={variant}>{text}</Badge>;
};
