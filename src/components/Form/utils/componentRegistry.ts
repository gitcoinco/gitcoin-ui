import { InputHTMLAttributes } from "react";

import { Select, SelectProps } from "@/primitives";
import { TextArea, TextAreaProps } from "@/primitives/TextArea";
import { Input } from "@/ui-shadcn/input";

import {
  AllowlistFormController,
  AllowlistFormControllerProps,
  FieldArrayProps,
} from "../FormControllers";
import {
  ApplicationQuestionsFormController,
  ApplicationQuestionsFormControllerProps,
} from "../FormControllers";
import { FieldArrayFormController, FieldArrayFormControllerProps } from "../FormControllers";
import { FileUploadFormController, FileUploadFormControllerProps } from "../FormControllers";
import {
  MarkdownEditorFormController,
  MarkdownEditorFormControllerProps,
} from "../FormControllers";
import { MetricsFormController, MetricsFormControllerProps } from "../FormControllers";
import { RoundDatesFormController } from "../FormControllers";
import { DisabledProgramInputFormController } from "../FormControllers/DisabledProgramInputFormController";
import { DisabledProgramInputFormControllerProps } from "../FormControllers/DisabledProgramInputFormController";
import {
  SelectFormController,
  SelectFormControllerProps,
} from "../FormControllers/SelectFormController";

// Extend or adjust as you add more components.
export const componentRegistry = {
  Input: {
    Component: Input,
    propKeys: {} as InputHTMLAttributes<HTMLInputElement>,
    isControlled: false,
  },
  Textarea: {
    Component: TextArea,
    propKeys: {} as TextAreaProps,
    isControlled: false,
  },
  MarkdownEditor: {
    Component: MarkdownEditorFormController,
    propKeys: {} as MarkdownEditorFormControllerProps,
    isControlled: true,
  },
  FileUpload: {
    Component: FileUploadFormController,
    propKeys: {} as FileUploadFormControllerProps,
    isControlled: true,
  },
  Select: {
    Component: SelectFormController,
    propKeys: {} as SelectFormControllerProps,
    isControlled: true,
  },
  FieldArray: {
    Component: FieldArrayFormController,
    propKeys: {} as FieldArrayProps,
    isControlled: true,
  },
  RoundDates: {
    Component: RoundDatesFormController,
    propKeys: {} as React.FC<unknown>,
    isControlled: true,
  },
  Metrics: {
    Component: MetricsFormController,
    propKeys: {} as MetricsFormControllerProps,
    isControlled: true,
  },
  ApplicationQuestions: {
    Component: ApplicationQuestionsFormController,
    propKeys: {} as ApplicationQuestionsFormControllerProps,
    isControlled: true,
  },
  Allowlist: {
    Component: AllowlistFormController,
    propKeys: {} as AllowlistFormControllerProps,
    isControlled: true,
  },
  DisabledProgramInput: {
    Component: DisabledProgramInputFormController,
    propKeys: {} as DisabledProgramInputFormControllerProps,
    isControlled: true,
  },
};

export type ComponentName = keyof typeof componentRegistry;
