// Status Icons
import {
  CheckIcon,
  CheckSolidIcon,
  ClockIcon,
  ExclamationCircleIcon,
  SparklesIcon,
  XIcon,
  XSolidIcon,
  CalendarIcon,
  VerifiedBadgeIcon,
  ShineIcon,
  UserIcon,
  SolidQuestionMarkCircleIcon,
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
  SOLID_CHECK = "solid-check",
  CLOCK = "clock",
  EXCLAMATION_CIRCLE = "exclamation-circle",
  SPARKLES = "sparkles",
  SHINE = "shine",
  X = "x",
  SOLID_X = "solid-x",
  CALENDAR = "calendar",
  USER = "user",
  VERIFIEDBADGE = "verifiedBadge",
  SOLID_QUESTION_MARK_CIRCLE = "questionMarkCircle",

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
  "solid-check": CheckSolidIcon,
  clock: ClockIcon,
  "exclamation-circle": ExclamationCircleIcon,
  sparkles: SparklesIcon,
  shine: ShineIcon,
  x: XIcon,
  "solid-x": XSolidIcon,
  questionMarkCircle: SolidQuestionMarkCircleIcon,
  twitter: TwitterIcon,
  github: GithubIcon,
  eth: ETHIcon,
  calendar: CalendarIcon,
  user: UserIcon,
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