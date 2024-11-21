import * as React from "react";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "@/lib/utils";

const accordionVariants = tv({
  slots: {
    item: "",
    trigger:
      "flex flex-1 items-center justify-between rounded-lg py-4 font-medium transition-all [&[data-state=open]>svg]:rotate-180",
    content:
      "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    contentInner: "py-4",
  },
  variants: {
    variant: {
      default: {
        trigger: "bg-grey-50",
      },
      light: {
        trigger: "bg-white",
      },
      blue: {
        trigger: "bg-blue-50",
        item: "bg-blue-50",
        content: "bg-blue-50",
      },
    },
    border: {
      none: {
        item: "",
        content: "",
      },
      sm: {
        item: "rounded-lg border border-neutral-100",
        content: "border-t border-neutral-100",
      },
      md: {
        item: "rounded-lg border-2 border-neutral-200",
        content: "border-t-2 border-neutral-200",
      },
    },
    padding: {
      none: {
        trigger: "px-2",
      },
      sm: {
        trigger: "px-4",
      },
      md: {
        trigger: "px-8",
      },
      lg: {
        trigger: "px-12",
      },
    },
  },
  defaultVariants: {
    variant: "default",
    border: "none",
    padding: "none",
  },
});

export type AccordionVariants = VariantProps<typeof accordionVariants>;

const AccordionRoot = AccordionPrimitive.Root;

type AccordionItemProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> &
  AccordionVariants & {
    className?: string;
  };

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(({ className, variant, border, ...props }, ref) => {
  const { item } = accordionVariants({ variant, border });
  return <AccordionPrimitive.Item ref={ref} className={cn(item(), className)} {...props} />;
});
AccordionItem.displayName = "AccordionItem";

type AccordionTriggerProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> &
  AccordionVariants & {
    className?: string;
  };

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ className, children, variant, border, padding, ...props }, ref) => {
  const { trigger } = accordionVariants({ variant, border, padding });
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger ref={ref} className={cn(trigger(), className)} {...props}>
        {children}
        <ChevronDown className="size-4 shrink-0 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

type AccordionContentProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> &
  AccordionVariants & {
    className?: string;
  };

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>(({ className, children, variant, border, ...props }, ref) => {
  const { content, contentInner } = accordionVariants({ variant, border });
  return (
    <AccordionPrimitive.Content ref={ref} className={cn(content(), className)} {...props}>
      <div className={cn(contentInner())}>{children}</div>
    </AccordionPrimitive.Content>
  );
});
AccordionContent.displayName = "AccordionContent";

export interface AccordionProps {
  header: React.ReactNode;
  content: React.ReactNode;
  variant?: AccordionVariants["variant"];
  border?: AccordionVariants["border"];
  padding?: AccordionVariants["padding"];
  isOpen?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({
  header,
  content,
  variant,
  border,
  padding,
  isOpen = true,
}: AccordionProps) => {
  return (
    <AccordionRoot type="multiple" defaultValue={isOpen ? ["item-1"] : undefined}>
      <AccordionItem variant={variant} border={border} value="item-1" className="flex flex-col">
        <AccordionTrigger variant={variant} border={border} padding={padding}>
          {header}
        </AccordionTrigger>
        <AccordionContent variant={variant} border={border}>
          {content}
        </AccordionContent>
      </AccordionItem>
    </AccordionRoot>
  );
};
