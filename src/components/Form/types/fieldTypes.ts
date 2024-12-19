import { SelectProps } from "@/primitives/Select";

interface BaseField {
  field: {
    name: string;
    label: string;
    validation?: {
      required?: boolean | string; // if string is provided, it's a custom error message
      minLength?: number | { value: number; message?: string };
      maxLength?: number | { value: number; message?: string };
      pattern?: string | { value: RegExp; message?: string };
      isFile?: boolean;
      // Add more validation rules as needed
    };
    className?: string;
  };
}

// For each component, define a specific field type that includes component-specific props.
// You can enforce these by intersecting your known prop types from the registry:

export interface InputField extends BaseField {
  component: "Input";
  // You can specify a type here or rely on a union of known props:
  type?: string;
  placeholder?: string;
  // Any other Input-specific props you want directly in the config
}

export interface TextareaField extends BaseField {
  component: "Textarea";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  heading?: string;
  placeholder?: string;
  // Any other TextArea-specific props you want to allow
}

export interface MarkdownEditorField extends BaseField {
  component: "MarkdownEditor";
  placeholder?: string;
  // Any other MarkdownEditor-specific props you want to allow
}

export interface FileUploadField extends BaseField {
  component: "FileUpload";
  // Any other FileUpload-specific props you want to allow
}

export interface SelectField extends BaseField, SelectProps {
  component: "Select";
  // Any other Select-specific props you want to allow
}

export type FormField =
  | InputField
  | TextareaField
  | MarkdownEditorField
  | FileUploadField
  | SelectField;
