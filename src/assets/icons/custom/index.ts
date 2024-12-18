import CheckerIcon from "./checker.svg?react";
import ExplorerIcon from "./explorer.svg?react";
import ShineIcon from "./shine.svg?react";
import UserIcon from "./user.svg?react";
import VerifiedBadgeIcon from "./verifiedBadge.svg?react";

enum CustomIconType {
  CHECKER = "checker",
  EXPLORER = "explorer",
  SHINE = "shine",
  USER = "user",
  VERIFIEDBADGE = "verifiedBadge",
}

const customIconComponents: Record<CustomIconType, React.FC<React.SVGProps<SVGSVGElement>>> = {
  checker: CheckerIcon,
  explorer: ExplorerIcon,
  shine: ShineIcon,
  user: UserIcon,
  verifiedBadge: VerifiedBadgeIcon,
};

const customIcons = Object.keys(customIconComponents).sort((a, b) =>
  a.localeCompare(b),
) as CustomIconType[];

export { CheckerIcon, ExplorerIcon, ShineIcon, UserIcon, VerifiedBadgeIcon };
export { CustomIconType, customIconComponents, customIcons };
