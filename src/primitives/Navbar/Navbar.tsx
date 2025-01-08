"use server";

import * as React from "react";

import { tv } from "tailwind-variants";

import { NavbarLogo, NavbarLogoProps, NavbarTitle, NavbarTitleProps } from "./components";

const navbarVariants = tv({
  slots: {
    base: "top-0 flex h-[64px] w-full shrink-0 flex-col items-center justify-center gap-2 p-[10px_80px]",
    container: "flex w-full items-center justify-between",
    leftSection: "flex items-center gap-4",
    divider: "h-4 border-r-1.5 border-grey-900",
    rightSection: "flex items-center",
  },
});

export interface NavbarProps {
  primaryLogo?: NavbarLogoProps;
  secondaryLogo?: NavbarLogoProps;
  showDivider?: boolean;
  text: NavbarTitleProps;
  children?: React.ReactNode;
}

export const Navbar = ({
  primaryLogo,
  secondaryLogo,
  showDivider = true,
  text,
  children,
}: NavbarProps) => {
  const { base, container, leftSection, divider, rightSection } = navbarVariants();

  return (
    <nav className={base()}>
      <div className={container()}>
        <div className={leftSection()}>
          <NavbarLogo {...primaryLogo} />
          {showDivider && <div className={divider()} />}
          <div className="flex items-center gap-2">
            {secondaryLogo && <NavbarLogo {...secondaryLogo} />}
            <NavbarTitle {...text} />
          </div>
        </div>
        <div className={rightSection()}>{children}</div>
      </div>
    </nav>
  );
};
