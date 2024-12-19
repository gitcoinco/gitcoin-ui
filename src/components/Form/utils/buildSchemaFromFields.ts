import { z } from "zod";

import { FormField } from "../types/fieldTypes";

export function buildSchemaFromFields(fields: FormField[]): z.ZodObject<any> {
  const shape: Record<string, z.ZodTypeAny> = {};

  const _fields = fields.map((field) => field.field);

  for (const field of _fields) {
    let fieldSchema;

    if (field.validation?.isFile) {
      fieldSchema = z.instanceof(File);
      shape[field.name] = fieldSchema;
      continue; // Skip other validations for file fields
    }

    fieldSchema = z.string();

    const { validation } = field;
    const label = field.label;

    if (validation) {
      if (validation.required) {
        const msg =
          typeof validation.required === "string" ? validation.required : `${label} is required`;
        fieldSchema = fieldSchema.min(1, msg);
      }

      if (validation.minLength) {
        const val =
          typeof validation.minLength === "number"
            ? validation.minLength
            : validation.minLength.value;
        const msg =
          typeof validation.minLength === "object" && validation.minLength.message
            ? validation.minLength.message
            : `${label} must have at least ${val} characters`;
        fieldSchema = fieldSchema.min(val, msg);
      }

      if (validation.maxLength) {
        const val =
          typeof validation.maxLength === "number"
            ? validation.maxLength
            : validation.maxLength.value;
        const msg =
          typeof validation.maxLength === "object" && validation.maxLength.message
            ? validation.maxLength.message
            : `${label} must have at most ${val} characters`;
        fieldSchema = fieldSchema.max(val, msg);
      }

      if (validation.pattern) {
        let pattern: RegExp;
        let msg: string;
        if (typeof validation.pattern === "string") {
          pattern = new RegExp(validation.pattern);
          msg = `${label} is invalid`;
        } else {
          pattern = validation.pattern.value;
          msg = validation.pattern.message ?? `${label} is invalid`;
        }
        fieldSchema = fieldSchema.regex(pattern, msg);
      }
    }

    shape[field.name] = fieldSchema;
  }

  return z.object(shape);
}
