import { cn } from "@/lib/utils";
import { Icon, IconType } from "@/primitives/Icon";

export type CheckerReviewsLabelProps = React.SVGProps<SVGSVGElement> & {
  posReviews: number;
  negReviews: number;
};

const ICON_CLASSES = {
  base: "size-7 bg-white",
  positive: " fill-green-600",
  negative: "fill-orange-200",
  border: "border border-gray-100 rounded-full",
};

const renderIcons = (countPos: number, countNeg: number, props: React.SVGProps<SVGSVGElement>) => {
  const negProps = { ...props, type: IconType.X };
  const posProps = { ...props, type: IconType.CHECK };
  const totalReviews = countPos + countNeg;

  return Array.from({ length: totalReviews }).map((_, index) => (
    <Icon
      key={index}
      {...(index < countPos ? posProps : negProps)}
      className={cn(
        ICON_CLASSES.base,
        ICON_CLASSES.border,
        index >= countPos ? ICON_CLASSES.negative : ICON_CLASSES.positive,
        index !== 0 ? "-ml-2" : "",
      )}
    />
  ));
};

export const CheckerReviewsLabelComponents: React.FC<CheckerReviewsLabelProps> = ({
  className,
  posReviews,
  negReviews,
  ...props
}) => {
  if (posReviews < 0) {
    posReviews = 0;
  }
  if (negReviews < 0) {
    negReviews = 0;
  }
  const totalReviews = posReviews + negReviews;
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center">{renderIcons(posReviews, negReviews, { ...props })}</div>
      <span className="text-[16px]/[24px]">{`${totalReviews} Reviews`}</span>
    </div>
  );
};

export const CheckerReviewsLabel: React.FC<CheckerReviewsLabelProps> = ({
  posReviews,
  negReviews,
  className,
  ...props
}) => (
  <CheckerReviewsLabelComponents
    className={className}
    posReviews={posReviews}
    negReviews={negReviews}
    {...props}
  />
);
