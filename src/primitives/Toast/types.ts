import {
  viewportVariants,
  type toastDescriptionVariants,
  type toastVariants,
  type toastCloseVariants,
} from "@/ui-shadcn/toast";

export type ToastProps = {
  status: "success" | "error" | "info" | "warning";
  description: string;
  timeout?: number;
  toastPosition?: keyof typeof viewportVariants.variants.position;
  descriptionSize?: keyof typeof toastDescriptionVariants.variants.size;
  toastSize?: keyof typeof toastVariants.variants.size;
  toastCloseVariant?: keyof typeof toastCloseVariants.variants.variant;
};
