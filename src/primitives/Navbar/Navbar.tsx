import * as React from "react";

import { tv } from "tailwind-variants";

import { GitcoinLogo } from "@/assets";

const defaultLogo = GitcoinLogo;

const navbarVariants = tv({
  slots: {
    base: "top-0 flex h-[64px] w-full shrink-0 flex-col items-center justify-center gap-2 p-[10px_80px]",
    container: "flex w-full items-center justify-between",
    leftSection: "flex items-center gap-4",
    logo: "h-10",
    divider: "h-4 border-r border-grey-700",
    text: "text-lg font-semibold",
    rightSection: "flex items-center",
  },
});

export interface NavbarProps {
  primaryLogo?: string;
  secondaryLogo?: string;
  showDivider?: boolean;
  text: string;
  primaryLogoLink?: string;
  secondaryLogoLink?: string;
  textLink?: string;
  children?: React.ReactNode;
}

export const Navbar = ({
  primaryLogo,
  secondaryLogo,
  showDivider = true,
  text,
  primaryLogoLink,
  secondaryLogoLink,
  textLink,
  children,
}: NavbarProps) => {
  const {
    base,
    container,
    leftSection,
    logo,
    divider,
    text: textStyle,
    rightSection,
  } = navbarVariants();

  return (
    <nav className={base()}>
      <div className={container()}>
        <div className={leftSection()}>
          <a href={primaryLogoLink || "#"}>
            <img src={primaryLogo || defaultLogo} alt="Primary Logo" className={logo()} />
          </a>
          {showDivider && <div className={divider()}></div>}
          {secondaryLogo && (
            <a href={secondaryLogoLink || "#"}>
              <img src={secondaryLogo} alt="Secondary Logo" className={logo()} />
            </a>
          )}
          <a href={textLink || "#"} className={textStyle()}>
            {text}
          </a>
        </div>
        <div className={rightSection()}>{children}</div>
      </div>
    </nav>
  );
};
