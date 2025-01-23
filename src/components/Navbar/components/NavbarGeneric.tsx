"use client";

import * as React from "react";

import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "@/lib";

import { filterAndSortChildren } from "../utils/filterAndSortChildren";

const navbarVariants = tv({
  base: "flex h-16 w-full items-center justify-between bg-white/[0.03] px-20 py-2.5 backdrop-blur-[22px]",
  variants: {
    behavior: {
      static: "",
      sticky: "sticky top-0 z-50",
      fixed: "fixed left-0 right-0 top-0 z-50",
    },
  },
  defaultVariants: {
    behavior: "sticky",
  },
});

export interface NavbarGenericProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof navbarVariants> {
  /** Children should be NavbarStartSection, NavbarCenterSection, or NavbarEndSection components */
  children?: React.ReactNode;
  /** Position of the navbar: static, sticky, or fixed */
  behavior?: "static" | "sticky" | "fixed";
}

export const NavbarGeneric = React.forwardRef<HTMLElement, NavbarGenericProps>(
  ({ className, behavior, children, ...props }, ref) => {
    const navbarStyle = navbarVariants({ behavior });
    const filteredChildren = filterAndSortChildren(children);
    return (
      <nav ref={ref} className={cn(navbarStyle, className)} {...props}>
        {filteredChildren}
      </nav>
    );
  },
);
NavbarGeneric.displayName = "NavbarGeneric";
