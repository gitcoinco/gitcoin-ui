import { CheckIcon, ClockIcon, ExclamationCircleIcon, SparklesIcon, XIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";

export enum IconType {
  CHECK = "check",
  CLOCK = "clock",
  EXCLAMATION_CIRCLE = "exclamation-circle",
  SPARKLES = "sparkles",
  X = "x",
}

export interface IconProps {
  type: IconType;
  color?: string;
  size?: string;
}

const iconComponents: Record<IconProps["type"], React.FC<React.SVGProps<SVGSVGElement>>> = {
  check: CheckIcon,
  clock: ClockIcon,
  "exclamation-circle": ExclamationCircleIcon,
  sparkles: SparklesIcon,
  x: XIcon,
};

export const Icon: React.FC<IconProps & React.SVGProps<SVGSVGElement>> = ({
  type,
  color = "black",
  size = "20px",
  className,
  ...props
}) => {
  const classNames = cn(
    className,
    color && color[0] === "#" ? `ui-fill-[${color}]` : `ui-fill-${color}`,
    size && `ui-size-[${size}]`,
  );
  const IconComponent = iconComponents[type];
  return <IconComponent className={`${classNames}`} {...props} />;
};

export const icons = Object.keys(iconComponents) as IconProps["type"][];
