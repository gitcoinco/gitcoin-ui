import { InputHTMLAttributes } from "react";

import { TextArea, TextAreaProps } from "@/primitives/TextArea";
import { Input } from "@/ui-shadcn/input";

import { SelectController, SelectControllerProps } from "./components";
import { MarkdownEditorController, MarkdownEditorControllerProps } from "./components";
import { FileUploadController, FileUploadControllerProps } from "./components";

// Extend or adjust as you add more components.
export const componentRegistry = {
  Input: {
    Component: Input,
    propKeys: {} as InputHTMLAttributes<HTMLInputElement>,
  },
  Textarea: {
    Component: TextArea,
    propKeys: {} as TextAreaProps,
  },
  MarkdownEditor: {
    Component: MarkdownEditorController,
    propKeys: {} as MarkdownEditorControllerProps,
  },
  FileUpload: {
    Component: FileUploadController,
    propKeys: {} as FileUploadControllerProps,
  },
  Select: {
    Component: SelectController,
    propKeys: {} as SelectControllerProps,
  },
};

// Extract the keys for reference:
export type ComponentName = keyof typeof componentRegistry;
