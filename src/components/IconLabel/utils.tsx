import { match, P } from "ts-pattern";

import { cn } from "@/lib/utils";
import { Icon, IconType } from "@/primitives/Icon";

import { variants } from "./variants";

const { container, icon, text } = variants();

export function getEvaluationMessage(percent: number): string {
  percent = Math.min(Math.max(percent, 0), 100);
  if (percent > 60) {
    return `Approve (${percent}%)`;
  } else if (percent > 40) {
    return `Uncertain (${percent}%)`;
  } else {
    return `Reject (${percent}%)`;
  }
}

export function renderReviewIcons(posReviews: number, negReviews: number) {
  const totalReviews = Math.max(0, posReviews) + Math.max(0, negReviews);
  const icons = [];

  for (let i = 0; i < totalReviews; i++) {
    const isPositive = i < posReviews;
    const isFirst = i === 0;
    const classes = getReviewIconClasses(isFirst, isPositive);

    icons.push(
      <Icon key={i} type={isPositive ? IconType.CHECK : IconType.X} className={classes} />,
    );
  }

  return icons;
}

function getReviewIconClasses(isFirst: boolean, isPositive: boolean): string {
  const baseClasses = icon({ type: "reviews" });
  let variantClasses = "";

  if (isPositive) {
    variantClasses = isFirst
      ? icon({ reviewType: "posFirst" })
      : icon({ reviewType: "posNotFirst" });
  } else {
    variantClasses = icon({ reviewType: "neg" });
  }

  return `${baseClasses} ${variantClasses}`;
}

export const IconLabelContainer = ({
  type,
  iconVariant,
  iconType,
  className,
  children,
}: React.PropsWithChildren<{
  type: any;
  className?: string;
  iconType?: IconType;
  iconVariant?: string;
}>) => (
  <div className={cn(container({ type }), className)}>
    {iconType && iconVariant && <RenderIcon iconType={iconType} iconVariant={iconVariant} />}
    {children}
  </div>
);

export const RenderIcon: React.FC<{ iconType: IconType; iconVariant: string }> = ({
  iconType,
  iconVariant,
}) => <Icon type={iconType} className={iconVariant} />;

export const getFormattedLink = (platform?: string, link?: string) => {
  return match(platform)
    .with("github", () => link?.split(".com/")[1])
    .with("twitter", () => `@${link?.split(".com/")[1]}`)
    .otherwise(() => link);
};

export const getAddressLabel = (ens?: string, address?: string) => {
  return match({ ens, address })
    .with({ ens: P.string }, ({ ens }) => ens)
    .with({ address: P.string }, ({ address }) => address.slice(0, 4) + "..." + address.slice(-4))
    .otherwise(() => "");
};