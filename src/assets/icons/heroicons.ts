// Status Icons
import { InformationCircleIcon } from "@heroicons/react/outline";
import {
  CalendarIcon,
  CheckCircleIcon as CheckSolidIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClipboardListIcon,
  ClockIcon,
  ExclamationCircleIcon,
  GlobeAltIcon as GlobeIcon,
  LinkIcon,
  QuestionMarkCircleIcon as SolidQuestionMarkCircleIcon,
  SparklesIcon,
  StarIcon,
  UserGroupIcon,
  XCircleIcon as XSolidIcon,
  XIcon,
} from "@heroicons/react/solid";

enum HeroiconsType {
  CALENDAR = "calendar",
  CHECK = "check",
  CHEVRON_LEFT = "chevron-left",
  CLIPBOARD_LIST = "clipboardList",
  CLOCK = "clock",
  EXCLAMATION_CIRCLE = "exclamation-circle",
  LINK = "link",
  GLOBE = "globe",
  INFORMATION_CIRCLE = "informationCircle",
  SOLID_CHECK = "solid-check",
  SOLID_QUESTION_MARK_CIRCLE = "questionMarkCircle",
  SOLID_X = "solid-x",
  SPARKLES = "sparkles",
  STAR = "star",
  USER_GROUP = "user-group",
  X = "x",
}

const heroiconsComponents: Record<HeroiconsType, React.FC<React.SVGProps<SVGSVGElement>>> = {
  calendar: CalendarIcon,
  check: CheckIcon,
  "chevron-left": ChevronLeftIcon,
  clipboardList: ClipboardListIcon,
  clock: ClockIcon,
  "exclamation-circle": ExclamationCircleIcon,
  informationCircle: InformationCircleIcon,
  globe: GlobeIcon,
  link: LinkIcon,
  questionMarkCircle: SolidQuestionMarkCircleIcon,
  "solid-check": CheckSolidIcon,
  sparkles: SparklesIcon,
  star: StarIcon,
  "user-group": UserGroupIcon,
  "solid-x": XSolidIcon,
  x: XIcon,
};

const heroIcons = Object.keys(heroiconsComponents).sort((a, b) =>
  a.localeCompare(b),
) as HeroiconsType[];

export {
  CalendarIcon,
  CheckSolidIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClipboardListIcon,
  ClockIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  GlobeIcon,
  LinkIcon,
  SolidQuestionMarkCircleIcon,
  SparklesIcon,
  StarIcon,
  UserGroupIcon,
  XSolidIcon,
  XIcon,
};

export { heroiconsComponents, HeroiconsType, heroIcons };
