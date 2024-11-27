import { match } from "ts-pattern";

import { cn } from "@/lib/utils";
import { Icon, IconType } from "@/primitives/Icon";

import { variants } from "./variants";

const { container } = variants();

export function getEvaluation(percent: number) {
  percent = Math.min(Math.max(percent, 0), 100);
  if (percent >= 60) {
    return { message: `Approve (${percent}%)`, variant: "ai-evaluation-a" };
  } else if (percent >= 40) {
    return { message: `Uncertain (${percent}%)`, variant: "ai-evaluation-u" };
  } else {
    return { message: `Reject (${percent}%)`, variant: "ai-evaluation-r" };
  }
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
