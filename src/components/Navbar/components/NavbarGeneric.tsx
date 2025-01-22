"use client";

import * as React from "react";

import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "@/lib";

import { filterAndSortChildren } from "../utils/filterAndSortChildren";

const navbarVariants = tv({
  base: "flex h-16 w-full items-center justify-between px-20 py-2.5",
  variants: {
    behavior: {
      static: "",
      sticky: "sticky top-0 z-50",
      fixed: "fixed left-0 right-0 top-0 z-50",
    },
    variant: {
      default: "bg-navbar shadow-navbar backdrop-blur-navbar",
    },
  },
  defaultVariants: {
    behavior: "sticky",
    variant: "default",
  },
});

export interface NavbarGenericProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof navbarVariants> {
  /** Children should be NavbarStartSection, NavbarCenterSection, or NavbarEndSection components */
  children?: React.ReactNode;
  /** Position of the navbar: static, sticky, or fixed */
  behavior?: "static" | "sticky" | "fixed";
  /** Visual variant of the navbar */
  variant?: "default";
}

export const NavbarGeneric = React.forwardRef<HTMLElement, NavbarGenericProps>(
  ({ className, behavior, variant, children, ...props }, ref) => {
    const navbarStyle = navbarVariants({ behavior, variant });
    const filteredChildren = filterAndSortChildren(children);
    return (
      <nav ref={ref} className={cn(navbarStyle, className)} {...props}>
        {filteredChildren}
      </nav>
    );
  },
);
NavbarGeneric.displayName = "NavbarGeneric";
