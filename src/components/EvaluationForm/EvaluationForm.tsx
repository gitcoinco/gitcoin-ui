import * as React from "react";

import { tv } from "tailwind-variants";

import RadioGroupList from "@/components/RadioGroupList/RadioGroupList";
import { Button } from "@/primitives/Button";
import { Icon, IconType } from "@/primitives/Icon";
import { TextArea } from "@/primitives/TextArea";

const formVariants = tv({
  base: "flex flex-col",
});

const headingStyles =
  "font-sans text-[24px] font-500 leading-[32px] tracking-[-0.006em] text-left mb-[20px] bg-white";

interface EvaluationFormProps {
  onSubmit: (data: {
    type: "approve" | "reject";
    selections: Record<string, string>;
    feedback: string;
  }) => void;
  groups: {
    id: string;
    heading: React.ReactNode;
    buttonsPerRow?: number;
    options?: { value: string; label: string; disabled?: boolean }[];
  }[];
}

const EvaluationForm: React.FC<EvaluationFormProps> = ({ onSubmit, groups }) => {
  const [selections, setSelections] = React.useState<Record<string, string>>({});
  const [feedback, setFeedback] = React.useState("");

  const handleSelectionChange = (newSelections: Record<string, string>) => {
    setSelections(newSelections);
  };

  const handleFeedbackChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = (type: "approve" | "reject", event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onSubmit({ type, selections, feedback });
  };

  return (
    <form className={formVariants()}>
      <h3 className={headingStyles}>Perform evaluation</h3>
      <RadioGroupList
        groups={groups.map((group) => ({
          buttonsPerRow: 3,
          ...group,
          options: group.options || [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
            { value: "uncertain", label: "Uncertain" },
          ],
        }))}
        onSelectionChange={handleSelectionChange}
      />
      <TextArea
        heading="Feedback"
        placeholder="Please provide your feedback here..."
        value={feedback}
        onChange={handleFeedbackChange}
      />
      <div className="mt-4 flex justify-end">
        <Button
          icon={<Icon type={IconType.X} />}
          variant="error"
          value="Reject"
          onClick={(e) => handleSubmit("reject", e)}
          className="mr-2"
        />
        <Button
          icon={<Icon type={IconType.CHECK} />}
          variant="success"
          value="Approve"
          onClick={(e) => handleSubmit("approve", e)}
        />
      </div>
    </form>
  );
};

export default EvaluationForm;
