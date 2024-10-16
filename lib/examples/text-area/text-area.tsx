import clsx from "clsx";
import { useMemo, useState, type ComponentProps } from "react";
import { isTooLong, getLength } from "./get-length";
import { twMerge as merge } from "tailwind-merge";

type TextAreaProps = ComponentProps<"textarea"> & { label: string };

export const TextArea = ({ label, required, maxLength, ...props }: TextAreaProps) => {
  const [value, setValue] = useState(props.value ?? "");
  const tooLong = useMemo(() => isTooLong(value, maxLength), [value, maxLength]);
  const length = useMemo(() => getLength(value), [value]);

  return (
    <label className="ui-flex ui-flex-col ui-gap-1.5">
      <span
        className={clsx(
          "ui-inline-flex ui-items-center ui-gap-1 ui-text-sm ui-font-medium",
          required && "after:ui-h-1.5 after:ui-w-1.5 after:ui-rounded-full after:ui-bg-accent-500",
        )}
      >
        {label}
      </span>

      <textarea
        className={merge(
          "ui-w-full ui-rounded-md ui-bg-transparent ui-bg-white ui-p-4 ui-text-sm ui-placeholder-slate-400 ui-shadow-sm ui-ring-1 ui-ring-inset ui-ring-slate-500 invalid:ui-bg-danger-50 focus:ui-bg-primary-50 focus:ui-outline-none focus:ui-ring-2 focus:ui-ring-primary-600 disabled:ui-cursor-not-allowed disabled:ui-bg-slate-50 dark:ui-bg-slate-800 dark:ui-placeholder-slate-300",
          tooLong &&
            "ui-ring-2 ui-ring-danger-500 focus:ui-ring-danger-500 dark:ui-ring-danger-500",
        )}
        {...props}
        onChange={(e) => {
          setValue(e.target.value);
          if (typeof props.onChange === "function") props.onChange(e);
        }}
        value={value}
        required={required}
        aria-invalid={tooLong}
      />

      {maxLength && (
        <div className="ui-flex ui-justify-end ui-text-xs">
          <p
            className={clsx(
              tooLong
                ? "ui-text-danger-600 dark:ui-text-danger-400"
                : "ui-text-slate-600 dark:ui-text-slate-400",
            )}
          >
            <span data-testid="length">{length}</span>/{maxLength}
          </p>
        </div>
      )}
    </label>
  );
};
