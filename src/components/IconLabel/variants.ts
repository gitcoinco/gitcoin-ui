import { tv } from "tailwind-variants";

export const variants = tv({
  slots: {
    container: "flex flex-wrap  items-center",
    icon: "size-5",
    text: "text-[16px]/[24px]",
  },
  variants: {
    type: {
      default: {
        container: "gap-2",
      },
      "ai-evaluation-a": {
        container: "gap-1",
        icon: "fill-green-600",
      },
      "ai-evaluation-u": {
        container: "gap-1",
        icon: "fill-yellow-300",
      },
      "ai-evaluation-r": {
        container: "gap-1",
        icon: "fill-red-700",
      },
      date: {
        container: "gap-2",
      },
      dateWithPrefix: { text: "text-grey-900" },
      social: {
        text: "text-green-brand hover:underline",
      },
      period: {
        container: "gap-2",
      },
      roundPeriod: {
        container: "gap-2",
        text: "text-[14px]/[17px] text-grey-700",
        icon: "size-4 fill-grey-700",
      },
      reviews: {
        container: "gap-2",
        icon: "size-7 rounded-full border border-grey-100 bg-white",
      },
      verifiedBadge: {
        icon: "h-5 w-[28px]",
      },
    },
    reviewType: {
      posFirst: { icon: "fill-green-600" },
      posNotFirst: { icon: "-ml-2 fill-green-600" },
      neg: { icon: "-ml-2 fill-red-200" },
    },
  },
});
