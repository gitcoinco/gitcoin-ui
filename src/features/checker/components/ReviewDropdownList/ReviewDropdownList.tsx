import { tv, type VariantProps } from "tailwind-variants";



import { cn } from "@/lib/utils";



import ReviewDropdown from "../ReviewDropdown/ReviewDropdown";
import { EvaluationSummaryProps } from "../ReviewDropdown/types";


const reviewDropdownVariants = tv({
  slots: {
    container: "flex flex-col gap-6",
  },
  defaultVariants: {
    // You can define default variants if needed
  },
});

export type ReviewDropdownVariants = VariantProps<typeof reviewDropdownVariants>;

interface ReviewDropdownListProps {
  evaluations: EvaluationSummaryProps[];
}

const ReviewDropdownList: React.FC<ReviewDropdownListProps> = ({ evaluations }) => {
  const { container } = reviewDropdownVariants();

  return (
    <div className={cn(container())}>
      {evaluations.map((evaluation, index) => (
        <ReviewDropdown
          key={index}
          evaluation={evaluation}
          index={index + 1}
          isOpen={index === 0}
        />
      ))}
    </div>
  );
};

export default ReviewDropdownList;