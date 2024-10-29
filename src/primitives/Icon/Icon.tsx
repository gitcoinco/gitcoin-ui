import {
  CheckIcon,
  ClockIcon,
  ExclamationCircleIcon,
  SparklesIcon,
  XIcon,
  ETHIcon,
  GithubIcon,
  CalendarIcon,
  VerifiedBadgeIcon,
  TwitterIcon,
  GlobeIcon,
} from "@/assets/icons";

export enum IconType {
  CHECK = "check",
  CLOCK = "clock",
  CALENDAR = "calendar",
  EXCLAMATION_CIRCLE = "exclamation-circle",
  SPARKLES = "sparkles",
  X = "x",
  GITHUB = "github",
  TWITTER = "twitter",
  ETH = "eth",
  VERIFIEDBADGE = "verifiedBadge",
  GLOBE = "globe",
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
  twitter: TwitterIcon,
  github: GithubIcon,
  eth: ETHIcon,
  calendar: CalendarIcon,
  verifiedBadge: VerifiedBadgeIcon,
  globe: GlobeIcon,
};

export const Icon: React.FC<IconProps> = ({ type, className, ...props }) => {
  const IconComponent = iconComponents[type];
  return <IconComponent className={className} {...props} />;
};

export const icons = Object.keys(iconComponents) as IconProps["type"][];
