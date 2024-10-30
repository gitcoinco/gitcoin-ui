import { IconType } from "@/primitives/Icon";

interface AIEvaluationProps {
  type: "ai-evaluation";
  percent?: number;
  className?: string;
}

interface DateProps {
  type: "date";
  date?: Date;
  className?: string;
}

interface DateWithPrefixProps {
  type: "dateWithPrefix";
  date?: Date;
  prefix: string;
  className?: string;
}

interface ReviewsProps {
  type: "reviews";
  posReviews?: number;
  negReviews?: number;
  className?: string;
}
interface AddressProps {
  type: "address";
  address?: string;
  ens?: string;
  className?: string;
}

interface SocialProps {
  type: "social";
  platform?: "github" | "twitter" | "website";
  link?: string;
  isVerified?: boolean;
  className?: string;
}

interface DefaultProps {
  type: "default";
  iconType: IconType;
  label: string;
  iconVariant?: string;
  textVariant?: string;
  className?: string;
}

export type IconLabelProps =
  | AIEvaluationProps
  | DateProps
  | ReviewsProps
  | AddressProps
  | SocialProps
  | DateWithPrefixProps
  | DefaultProps;
