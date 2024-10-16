import { ComponentProps } from "react";
import clsx from "clsx";

export type CheckboxProps = Omit<ComponentProps<"input">, "type"> & {
  label: string;
};

export const Checkbox = ({ label, className, ...props }: CheckboxProps) => {
  return (
    <label
      className={clsx(
        "ui-inline-flex ui-cursor-pointer ui-select-none ui-items-center ui-gap-1.5",
        props.disabled && "ui-cursor-not-allowed ui-opacity-50",
        className,
      )}
    >
      <input type="checkbox" className="ui-peer ui-sr-only" {...props} />
      <div className="ui-relative ui-size-4 ui-min-w-4 ui-rounded ui-border ui-border-slate-500 ui-bg-slate-50 ui-shadow-sm after:ui-absolute after:ui-left-0.5 after:ui-top-0 after:ui-text-xs after:ui-text-white after:ui-drop-shadow-sm peer-checked:ui-border-primary-800 peer-checked:ui-bg-primary-600 peer-checked:after:ui-content-['✔'] peer-focus:ui-ring-1 peer-focus:ui-ring-primary-500 peer-focus:ui-ring-offset-2 dark:ui-bg-slate-700 dark:ui-ring-offset-slate-800 dark:peer-checked:ui-bg-primary-600" />
      <span className="ui-text-sm ui-font-medium">{label}</span>
    </label>
  );
};
