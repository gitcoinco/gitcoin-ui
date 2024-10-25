import { Icon, IconType } from "@/primitives/Icon";
import { cn } from "@/lib/utils";
import { formatDate, DateFormat } from "@/lib/dates/formatDate";

export type CheckerDateLabelProps = React.HTMLAttributes<HTMLDivElement> & {
  date: Date;
};

export const CheckerDateLabelComponents: React.FC<CheckerDateLabelProps> = ({
  className,
  date,
}) => {
  const formattedDate = formatDate(date, DateFormat["Default"]);
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Icon type={IconType.CLOCK} className={"size-5"} />
      <span className="text-[16px]/[24px]">{formattedDate}</span>
    </div>
  );
};
export const CheckerDateLabel: React.FC<CheckerDateLabelProps> = ({
  date,
  className,
  ...props
}) => {
  return <CheckerDateLabelComponents className={className} date={date} {...props} />;
};
