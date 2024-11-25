// Status Icons
import {
  CheckIcon,
  CheckSolidIcon,
  LinkIcon,
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
  clipboardListIcon,
  StarIcon,
  InformationCircleIcon,
  ExplorerIcon,
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
  LINK = "link",
  CLOCK = "clock",
  CLIPBOARD_LIST = "clipboardList",
  STAR = "star",
  INFORMATION_CIRCLE = "informationCircle",
  EXCLAMATION_CIRCLE = "exclamation-circle",
  SPARKLES = "sparkles",
  SHINE = "shine",
  X = "x",
  SOLID_X = "solid-x",
  CALENDAR = "calendar",
  USER = "user",
  VERIFIEDBADGE = "verifiedBadge",
  SOLID_QUESTION_MARK_CIRCLE = "questionMarkCircle",
  EXPLORER = "explorer",

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
  link: LinkIcon,
  clock: ClockIcon,
  clipboardList: clipboardListIcon,
  star: StarIcon,
  informationCircle: InformationCircleIcon,
  "exclamation-circle": ExclamationCircleIcon,
  sparkles: SparklesIcon,
  shine: ShineIcon,
  x: XIcon,
  explorer: ExplorerIcon,
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
