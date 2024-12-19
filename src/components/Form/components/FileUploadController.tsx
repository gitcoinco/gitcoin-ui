import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import { FileUpload } from "@/primitives/FileUpload";

export interface FileUploadControllerProps {
  name: string;
}

export const FileUploadController: React.FC<FileUploadControllerProps> = ({ name }) => {
  const { control, watch } = useFormContext();
  const fieldValue = watch(name);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FileUpload
          onChange={async (file) => {
            if (file) {
              field.onChange(file);
            }
          }}
          value={fieldValue}
        />
      )}
    />
  );
};
