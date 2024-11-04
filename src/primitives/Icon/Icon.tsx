// Status Icons
import {
  CheckIcon,
  ClockIcon,
  ExclamationCircleIcon,
  SparklesIcon,
  XIcon,
  CalendarIcon,
  VerifiedBadgeIcon,
} from "@/assets/icons";
// Social Media Icons
import { GithubIcon, TwitterIcon, GlobeIcon } from "@/assets/icons";
// Blockchain Icons
import {
  ETHIcon,
  OptimismIcon,
  PolygonIcon,
  ArbitrumIcon,
  AvaxIcon,
  BaseIcon,
} from "@/assets/icons";

export enum IconType {
  // Status Icons
  CHECK = "check",
  CLOCK = "clock",
  EXCLAMATION_CIRCLE = "exclamation-circle",
  SPARKLES = "sparkles",
  X = "x",
  CALENDAR = "calendar",
  VERIFIEDBADGE = "verifiedBadge",

  // Social Media Icons
  GITHUB = "github",
  TWITTER = "twitter",
  GLOBE = "globe",

  // Blockchain Icons
  ETH = "eth",
  OPTIMISM = "optimism",
  POLYGON = "polygon",
  ARBITRUM = "arbitrum",
  AVAX = "avax",
  BASE = "base",
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
  optimism: OptimismIcon,
  polygon: PolygonIcon,
  arbitrum: ArbitrumIcon,
  avax: AvaxIcon,
  base: BaseIcon,
};

export const Icon: React.FC<IconProps> = ({ type, className, ...props }) => {
  const IconComponent = iconComponents[type];
  return <IconComponent className={className} {...props} />;
};

export const icons = Object.keys(iconComponents) as IconProps["type"][];
