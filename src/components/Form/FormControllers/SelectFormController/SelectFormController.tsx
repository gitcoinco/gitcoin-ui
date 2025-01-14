"use client";

import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { Select, SelectProps } from "@/primitives/Select";

export interface SelectFormControllerProps extends SelectProps {
  name: string;
}

export const SelectFormController: React.FC<any> = ({
  name,
  options,
  placeholder,
  className,
  size,
  variant,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          options={options}
          defaultValue={field.value}
          onValueChange={field.onChange}
          placeholder={placeholder}
          className={className}
          size={size}
          variant={variant}
        />
      )}
    />
  );
};
