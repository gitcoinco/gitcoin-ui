import * as React from "react";

import { SelectGroup } from "@radix-ui/react-select";
import { tv } from "tailwind-variants";

import {
  Select as ShadcnSelect,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectValue,
} from "@/ui-shadcn/select";

export interface SelectProps {
  options: {
    groupLabel?: string;
    items: {
      label: string;
      value: string;
    }[];
    separator?: boolean;
  }[];
  placeholder?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  variant?: "default" | "outlined" | "filled";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const selectStyles = tv({
  base: "h-10 rounded-md border text-sm",
  variants: {
    variant: {
      default: "border-transparent bg-white ",
      outlined: "border-transparent bg-transparent",
      filled: "bg-grey-200",
    },
    size: {
      sm: "h-8 text-xs",
      md: "h-10 text-sm",
      lg: "h-12 text-base",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export const Select = ({
  options,
  placeholder = "Select an option",
  onValueChange,
  defaultValue,
  variant,
  size,
  className,
}: SelectProps) => {
  return (
    <ShadcnSelect defaultValue={defaultValue} onValueChange={onValueChange}>
      <SelectTrigger className={selectStyles({ variant, size, className })}>
        <SelectValue placeholder={defaultValue ?? placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((group, index) => (
          <React.Fragment key={index}>
            {group.groupLabel && (
              <SelectGroup>
                <SelectLabel>{group.groupLabel}</SelectLabel>
              </SelectGroup>
            )}
            {group.items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
            {group.separator && <SelectSeparator />}
          </React.Fragment>
        ))}
      </SelectContent>
    </ShadcnSelect>
  );
};
