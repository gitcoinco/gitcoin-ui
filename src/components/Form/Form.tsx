import { useForm, FormProvider, useFormContext } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/primitives/Button";

import { componentRegistry } from "./componentRegistry";
import { usePersistForm } from "./hooks/usePersistForm";
import { FormField } from "./types/fieldTypes";
import { buildSchemaFromFields } from "./utils/buildSchemaFromFields";

export interface FormProps {
  schema?: z.ZodSchema; // optional, if not provided, derived from fields
  defaultValues?: Record<string, any>;
  persistKey?: string;
  onSubmit: (values: any) => void;
  fields: FormField[];
  formTitle: string;
  formDescription: string;
  onBack?: () => void;
  onNext?: () => void;
  finalButtonText?: string;
  backButtonText?: string;
  nextButtonText?: string;
}

export function Form({
  schema,
  defaultValues,
  persistKey,
  onSubmit,
  fields,
  formDescription,
  formTitle,
  onBack,
  onNext,
  finalButtonText,
  backButtonText,
  nextButtonText,
}: FormProps) {
  // If no schema is provided, build one from the fields:
  const finalSchema = schema ?? buildSchemaFromFields(fields);

  const form = useForm({
    defaultValues,
    resolver: zodResolver(finalSchema),
    mode: "onBlur",
  });

  usePersistForm(form, persistKey);

  const handleNextClick = () => {
    // Trigger validation. If successful, call onSubmit and then onNext.
    form.handleSubmit((values) => {
      onSubmit(values);
      onNext?.();
    })();
  };

  return (
    <FormProvider {...form}>
      <div className="flex flex-col gap-6 rounded-2xl bg-grey-50 p-6">
        <div className="flex flex-col gap-3">
          {/* Form Title */}
          <div className="font-ui-sans text-[24px]/[32px] font-medium">{formTitle}</div>
          {/* Form Description */}
          <div className="font-ui-sans text-[18px]/[28px] font-normal text-grey-900">
            {formDescription}
          </div>
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {fields.map((field) => (
            <FormControl key={field.field.name} field={field} />
          ))}

          <div className="flex items-center justify-between">
            {backButtonText && (
              <Button
                variant="error"
                onClick={onBack} // No validation triggered on back
                value={backButtonText}
                type="button"
              />
            )}
            {nextButtonText && (
              <Button
                variant="primary"
                onClick={handleNextClick}
                value={nextButtonText}
                type="button" // type=button so it doesn't auto-submit
              />
            )}
            {finalButtonText && (
              <Button
                variant="primary"
                onClick={form.handleSubmit(onSubmit)} // Validate and submit
                value={finalButtonText}
                type="submit"
              />
            )}
          </div>
        </form>
      </div>
    </FormProvider>
  );
}

function FormControl({ field }: { field: FormField }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const registryEntry = componentRegistry[field.component];
  const { Component } = registryEntry;
  const { field: fieldProps, ...componentProps } = field;

  return (
    <div className="flex flex-col justify-center gap-2">
      <div className="flex items-center justify-between">
        <label htmlFor={fieldProps.name} className="block text-[14px]/[20px] font-medium">
          {fieldProps.label}
        </label>
        {fieldProps.validation?.required && (
          <div className="text-[14px]/[16px] text-moss-700 ">*Required</div>
        )}
      </div>

      <Component {...(componentProps as any)} {...register(fieldProps.name)} />
      {errors[fieldProps.name] && (
        <p className="text-sm text-red-300">{String(errors[fieldProps.name]?.message)}</p>
      )}
    </div>
  );
}
