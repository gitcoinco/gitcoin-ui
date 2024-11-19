import * as React from "react";

import { match } from "ts-pattern";

import { Icon, IconType } from "@/primitives/Icon";
import {
  Toast as ShadcnToast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastProvider,
  ToastViewport,
} from "@/ui-shadcn/toast";

import { ToastProps } from "./types";

const Toast = ({ props }: { props: ToastProps }) => {
  const { toastPosition = "bottom-right" } = props; // Set default value
  const { descriptionSize = "medium" } = props; // Set default value
  const { toastSize = "medium" } = props; // Set default value
  const { toastCloseVariant = "alwaysVisible" } = props; // Set default value
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    if (open && props.timeout) {
      const timer = setTimeout(() => {
        setOpen(false);
      }, props.timeout);

      return () => clearTimeout(timer);
    }
  }, [open, props.timeout]);

  const ToastTitleIcon = match({ props })
    .with({ props: { status: "success" } }, () => (
      <Icon type={IconType.SOLID_CHECK} className="size-5 rounded-full " />
    ))
    .with({ props: { status: "error" } }, () => (
      <Icon type={IconType.SOLID_X} className="size-5 rounded-full" />
    ))
    // with({ props: { status: "info" } }, () => <Icon type={IconType.INFO} className="rounded-full size-5" />).
    // with({ props: { status: "warning" } }, () => <Icon type={IconType.WARNING} className="rounded-full size-5" />).
    // otherwise(() => <Icon type={IconType.INFO} className="rounded-full size-5" />);
    .with({ props: { status: "info" } }, () => (
      <Icon type={IconType.SOLID_X} className="size-5 rounded-full" />
    ))
    .with({ props: { status: "warning" } }, () => (
      <Icon type={IconType.SOLID_X} className="size-5 rounded-full" />
    ))
    .otherwise(() => <Icon type={IconType.SOLID_X} className="size-5 rounded-full" />);

  return (
    <ToastProvider swipeDirection="right">
      <button onClick={handleOpen} className="btn-primary">
        Show Toast
      </button>
      <ToastViewport position={toastPosition} />
      {open && (
        <ShadcnToast size={toastSize} variant="default" onOpenChange={setOpen}>
          <ToastTitle>{ToastTitleIcon}</ToastTitle>
          <div className="flex gap-6">
            <ToastDescription size={descriptionSize}>{props.description}</ToastDescription>
            <ToastClose onClick={handleClose} variant={toastCloseVariant} />
          </div>
        </ShadcnToast>
      )}
    </ToastProvider>
  );
};

export default Toast;
