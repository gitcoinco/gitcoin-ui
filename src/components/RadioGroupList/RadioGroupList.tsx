import * as React from "react";

import { tv } from "tailwind-variants";

import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/primitives/RadioGroup";

const radioGroupList = tv({
  slots: {
    root: "flex flex-col",
    header: "mb-4 font-sans text-[16px] font-bold leading-[24px]",
    radioGroupWrapper: "mb-10",
  },
});

const { root, radioGroupWrapper } = radioGroupList();

interface RadioGroupListProps {
  groups: {
    id: string;
    heading: React.ReactNode;
    options: { value: string; label: string; disabled?: boolean }[];
  }[];
  onSelectionChange?: (selections: Record<string, string>) => void;
  className?: string;
}

const RadioGroupList: React.FC<RadioGroupListProps> = ({
  groups,
  onSelectionChange,
  className,
}) => {
  const [selections, setSelections] = React.useState<Record<string, string>>({});

  const handleSelectionChange = (groupId: string, value: string) => {
    setSelections((prev) => {
      const newSelections = { ...prev, [groupId]: value };
      if (onSelectionChange) {
        onSelectionChange(newSelections);
      }
      return newSelections;
    });
  };

  return (
    <div className={cn(root(), className)}>
      {groups.map((group) => (
        <div key={group.id} className={radioGroupWrapper()}>
          <RadioGroup
            buttonsPerRow={2}
            heading={group.heading}
            value={selections[group.id]}
            onValueChange={(value) => handleSelectionChange(group.id, value)}
          >
            {group.options.map((option) => (
              <RadioGroupItem
                key={option.value}
                value={option.value}
                label={option.label}
                disabled={option.disabled}
              />
            ))}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default RadioGroupList;
