// src/components/Form/MarkdownEditorController.tsx
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { MarkdownEditor, MarkdownEditorProps } from "@/primitives/MarkdownEditor";

export interface MarkdownEditorControllerProps
  extends Omit<MarkdownEditorProps, "value" | "onChange"> {
  name: string;
}

export const MarkdownEditorController: React.FC<MarkdownEditorControllerProps> = ({
  name,
  ...rest
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <MarkdownEditor {...rest} value={field.value} onChange={field.onChange} />
      )}
    />
  );
};
