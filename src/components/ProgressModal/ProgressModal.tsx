// ProgressModal.tsx
import { Check, X } from "lucide-react";

import { Modal } from "@/primitives";
import { Dialog, DialogHeader, DialogTitle, DialogDescription } from "@/ui-shadcn/dialog";

import { ProgressStatus, Step } from "./types";

export interface ProgressModalProps {
  steps: Step[];
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  heading?: string;
  subheading?: string;
}

export const ProgressModal = ({
  isOpen,
  onOpenChange,
  heading = "Processing...",
  subheading = "Please hold while your operation is in progress.",
  steps,
}: ProgressModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <Modal className="w-[450px] flex-col gap-8 rounded-2xl p-8">
        <DialogHeader className="flex  flex-col gap-1">
          <DialogTitle className="text-base font-semibold text-black">{heading}</DialogTitle>
          <DialogDescription className="text-[14px]/[24px] text-grey-700">
            {subheading}
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-hidden ">
          {steps.map((step, stepIdx) => (
            <div
              key={stepIdx}
              className={`relative ${stepIdx !== steps.length - 1 ? "pb-10" : ""}`}
              data-testid={`${step.name}-${step.status}`}
            >
              <ModalStep
                step={step}
                status={step.status}
                isLastStep={stepIdx === steps.length - 1}
              />
            </div>
          ))}
        </div>
      </Modal>
    </Dialog>
  );
};

function ModalStep({
  step,
  status,
  isLastStep,
}: {
  step: Step;
  status: ProgressStatus;
  isLastStep: boolean;
}) {
  const { icon, line, nameColor, descriptionColor } = getStepAttributes(status, isLastStep);

  return (
    <>
      {!isLastStep && line}
      <div className="relative flex">
        <span className="flex h-9 items-center" aria-hidden="true">
          {icon}
        </span>
        <span className="ml-4 flex min-w-0 flex-col">
          <span
            className={`font-ui-sans text-[14px]/[16px] font-semibold uppercase tracking-wide ${nameColor}`}
          >
            {step.name}
          </span>
          <span className={`text-[14px]/[24px] ${descriptionColor}`}>{step.description}</span>
        </span>
      </div>
    </>
  );
}

function getStepAttributes(
  status: ProgressStatus,
  isLastStep: boolean,
): {
  icon: JSX.Element;
  line: JSX.Element | null;
  nameColor: string;
  descriptionColor: string;
} {
  switch (status) {
    case ProgressStatus.IS_SUCCESS:
      return {
        icon: (
          <span
            className="relative z-10 flex size-8 items-center justify-center rounded-full bg-brand"
            data-testid="complete-icon"
          >
            <Check className="size-5 text-white" aria-hidden="true" />
          </span>
        ),
        line: !isLastStep ? (
          <div
            className="absolute inset-y-4 left-4 z-10 -ml-px  h-full w-0.5 bg-brand"
            aria-hidden="true"
          />
        ) : null,
        nameColor: "text-black",
        descriptionColor: "text-black",
      };
    case ProgressStatus.IN_PROGRESS:
      return {
        icon: (
          <span className="relative z-20 flex size-8 items-center justify-center rounded-full border-2 border-grey-700 bg-white">
            <span
              className="animate-pulse-scale size-2.5 rounded-full bg-grey-700"
              data-testid="current-icon"
            />
          </span>
        ),
        line: !isLastStep ? (
          <div
            className="bg-neutral-200 absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5"
            aria-hidden="true"
          />
        ) : null,
        nameColor: "text-black",
        descriptionColor: "text-black",
      };
    case ProgressStatus.IS_ERROR:
      return {
        icon: (
          <span className="relative z-10 flex size-8 items-center justify-center rounded-full border-2 border-pink-500 bg-white">
            <X className="size-5 text-pink-500" data-testid="error-icon" />
          </span>
        ),
        line: !isLastStep ? (
          <div
            className="bg-neutral-200 absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5"
            aria-hidden="true"
          />
        ) : null,
        nameColor: "text-grey-700",
        descriptionColor: "text-grey-700",
      };
    case ProgressStatus.NOT_STARTED:
      return {
        icon: (
          <span
            className="relative z-10 flex size-8 items-center justify-center rounded-full border-2 border-neutral-600 bg-white"
            data-testid="upcoming-icon"
          ></span>
        ),
        line: !isLastStep ? (
          <div
            className="bg-neutral-200 absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5"
            aria-hidden="true"
          />
        ) : null,
        nameColor: "text-grey-700",
        descriptionColor: "text-grey-700",
      };
    default:
      return {
        icon: <></>,
        line: null,
        nameColor: "",
        descriptionColor: "",
      };
  }
}
