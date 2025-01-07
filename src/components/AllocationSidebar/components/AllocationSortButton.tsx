import { ArrowDownNarrowWide } from "lucide-react";
import { ArrowUpWideNarrow } from "lucide-react";

import { Button } from "@/primitives/Button";

export function AllocationSortButton({
  isAscending,
  onToggleOrder,
}: {
  isAscending: boolean;
  onToggleOrder: () => void;
}) {
  const Icon = isAscending ? ArrowUpWideNarrow : ArrowDownNarrowWide;
  const title = isAscending ? "Ascending" : "Descending";
  return (
    <Button
      onClick={onToggleOrder}
      className="h-8 w-24 p-2 text-[12px]/[14px] font-normal"
      icon={<Icon className="size-4" />}
      variant="ghost"
      size="xs"
      iconPosition="right"
      value={title}
    />
  );
}
