import * as React from "react";

import { tv } from "tailwind-variants";

import { GitcoinLogo } from "@/assets";

const defaultLogo = GitcoinLogo;

const navbarVariants = tv({
  slots: {
    base: "top-0 flex h-[64px] w-full shrink-0 flex-col items-center justify-center gap-2 p-[10px_80px]",
    container: "flex w-full items-center justify-between",
    leftSection: "flex items-center gap-4",
    logo: "h-10 max-w-12",
    divider: "h-4 border-r border-grey-700",
    text: "text-lg font-semibold",
    rightSection: "flex items-center",
  },
});

export interface NavbarProps {
  primaryLogo?: string | React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  secondaryLogo?: string | React.FunctionComponent<React.SVGAttributes<SVGElement>>;
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

  const renderLogo = (
    img: string | React.FunctionComponent<React.SVGAttributes<SVGElement>> | undefined,
  ) => {
    if (!img) {
      return <img src={defaultLogo} alt="Default Logo" className={logo()} />;
    }

    if (typeof img === "string") {
      return <img src={img} alt="Logo" className={logo()} />;
    }

    const LogoComponent = img;
    return <LogoComponent className={logo()} />;
  };

  return (
    <nav className={base()}>
      <div className={container()}>
        <div className={leftSection()}>
          <a href={primaryLogoLink || "#"}>{renderLogo(primaryLogo)}</a>
          {showDivider && <div className={divider()}></div>}
          {secondaryLogo && <a href={secondaryLogoLink || "#"}>{renderLogo(secondaryLogo)}</a>}
          <a href={textLink || "#"} className={textStyle()}>
            {text}
          </a>
        </div>
        <div className={rightSection()}>{children}</div>
      </div>
    </nav>
  );
};
