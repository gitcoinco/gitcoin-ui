import type { ComponentProps } from "react";
import clsx from "clsx";

type InputProps = ComponentProps<"input"> & {
  label: string;
  details?: string;
  required?: boolean;
  unlabeled?: boolean;
  disabled?: boolean;
};

export const Input = ({
  label,
  value,
  details,
  placeholder,
  required = false,
  unlabeled = false,
  disabled = false,
  ...props
}: InputProps) => {
  return (
    <label className="ui-flex ui-flex-col ui-gap-1.5">
      <span
        className={clsx(
          "ui-inline-flex ui-items-center ui-gap-1 ui-text-sm ui-font-medium",
          required && "after:ui-h-1.5 after:ui-w-1.5 after:ui-rounded-full after:ui-bg-accent-500",
          unlabeled && "ui-sr-only",
        )}
      >
        {label}
      </span>

      <input
        value={value}
        className="ui-block ui-w-full ui-gap-2 ui-rounded-md ui-bg-white ui-px-3 ui-py-1 ui-text-sm ui-placeholder-slate-400 ui-shadow-sm ui-ring-1 ui-ring-inset ui-ring-slate-500 focus:ui-bg-primary-50 focus:ui-outline-none focus:ui-ring-2 focus:ui-ring-primary-600 disabled:ui-cursor-not-allowed disabled:ui-bg-slate-50 dark:ui-bg-slate-800 dark:ui-placeholder-slate-300"
        placeholder={unlabeled ? label : placeholder}
        disabled={disabled}
        required={required}
        {...props}
      />
      {details && <span className="ui-text-xs ui-text-slate-500">{details}</span>}
    </label>
  );
};
