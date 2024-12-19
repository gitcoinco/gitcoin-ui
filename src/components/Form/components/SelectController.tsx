import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { Select, SelectProps } from "@/primitives/Select";

export interface SelectControllerProps extends Omit<SelectProps, "value" | "onValueChange"> {
  name: string;
}

export const SelectController: React.FC<SelectControllerProps> = ({ name, ...rest }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select {...rest} defaultValue={field.value} onValueChange={field.onChange} />
      )}
    />
  );
};
