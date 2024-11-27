import * as React from "react";



import { tv, type VariantProps } from "tailwind-variants";



import { GitcoinLogo } from "@/assets";


const defaultLogo = GitcoinLogo;

const navbarVariants = tv({
  slots: {
    base: "top-0 flex h-[64px] w-full shrink-0 flex-col items-center justify-center gap-2 p-[10px_80px]",
    container: "flex w-full items-center justify-between",
    left: "flex items-center gap-4",
    logo: "h-10",
    divider: "h-4 border-r border-grey-700",
    text: "text-lg font-semibold",
    right: "flex items-center",
  },
});

export interface NavbarProps {
  logo1?: string;
  logo2?: string;
  showDivider?: boolean;
  text: string;
  children?: React.ReactNode;
}

export const Navbar = ({ logo1, logo2, showDivider=true, text, children }: NavbarProps) => {
  const { base, container, left, logo, divider, text: textStyle, right } = navbarVariants();

  return (
    <nav className={base()}>
      <div className={container()}>
        <div className={left()}>
          <img src={logo1 || defaultLogo} alt="Logo 1" className={logo()} />
          {showDivider && <div className={divider()}></div>}
          {logo2 && <img src={logo2} alt="Logo 2" className={logo()} />}
          <span className={textStyle()}>{text}</span>
        </div>
        <div className={right()}>{children}</div>
      </div>
    </nav>
  );
};