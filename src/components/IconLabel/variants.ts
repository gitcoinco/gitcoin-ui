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
      "ai-evaluation": {
        container: "gap-1",
        icon: "fill-green-600",
      },
      date: {
        container: "gap-2",
      },
      dateWithPrefix: { text: "text-gray-500" },
      social: {
        text: "text-green-brand hover:underline",
      },

      reviews: {
        container: "gap-2",
        icon: "size-7 rounded-full border border-gray-100 bg-white",
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