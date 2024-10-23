import { CheckIcon, ClockIcon, ExclamationCircleIcon, SparklesIcon, XIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";

export enum IconType {
  CHECK = "check",
  CLOCK = "clock",
  EXCLAMATION_CIRCLE = "exclamation-circle",
  SPARKLES = "sparkles",
  X = "x",
}

export type IconProps = React.SVGProps<SVGSVGElement> & {
  type: IconType;
};

const iconComponents: Record<IconProps["type"], React.FC<React.SVGProps<SVGSVGElement>>> = {
  check: CheckIcon,
  clock: ClockIcon,
  "exclamation-circle": ExclamationCircleIcon,
  sparkles: SparklesIcon,
  x: XIcon,
};

export const Icon: React.FC<IconProps> = ({ type, className, ...props }) => {
  const IconComponent = iconComponents[type];
  return <IconComponent className={className} {...props} />;
};

export const icons = Object.keys(iconComponents) as IconProps["type"][];
