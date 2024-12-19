// src/components/SetupProgressForm.tsx
import { useState } from "react";

import { CheckIcon } from "@heroicons/react/solid";
import { Circle } from "lucide-react";

import { Form, FormProps } from "@/index";
import { ProgressBar } from "@/primitives/ProgressBar";

interface Step {
  name: string;
  props: FormProps;
}

interface SetupProgressFormProps {
  name: string;
  steps: Step[];
}

export const SetupProgressForm = ({ name, steps }: SetupProgressFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (values: any) => {
    // The onSubmit passed from each step will be called by the Form
    console.log("Submitted values from step:", currentStep, values);
  };

  const currentStepProps = steps[currentStep].props;
  const progressValue = (currentStep / steps.length) * 100;

  return (
    <div className="inset-0 flex justify-center gap-24 px-20 pt-16">
      <div className="relative flex flex-col gap-6">
        <div>{name}</div>
        <ProgressBar value={progressValue} variant="green-md" />
        {steps.map((step, index) => (
          <div key={index} className="flex items-center justify-start gap-2">
            {currentStep > index ? (
              <CheckIcon className="size-5 text-black" />
            ) : (
              <Circle className="size-1 rounded-full bg-black text-black" />
            )}
            <div className="font-ui-sans text-[16px]/[28px] font-medium text-grey-900">
              {step.name}
            </div>
          </div>
        ))}
      </div>
      <div className="w-full max-w-[956px]">
        <Form
          key={currentStep}
          {...currentStepProps}
          onBack={handlePreviousStep}
          onNext={handleNextStep}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};
