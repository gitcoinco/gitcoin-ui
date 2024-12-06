import * as React from "react";

import { tv } from "tailwind-variants";

import { GitcoinLogo } from "@/assets";

const defaultLogo = GitcoinLogo;

const navbarVariants = tv({
  slots: {
    base: "top-0 flex h-[64px] w-full shrink-0 flex-col items-center justify-center gap-2 p-[10px_80px]",
    container: "flex w-full items-center justify-between",
    leftSection: "flex items-center gap-4",
    divider: "h-4 border-r-1.5 border-grey-700",
    text: "font-mono text-lg",
    rightSection: "flex items-center",
  },
});

interface LogoProps {
  link?: string;
  img?: string | React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  size?: string;
  color?: string;
}

interface TextProps {
  text: string;
  link?: string;
  className?: string;
}

export interface NavbarProps {
  primaryLogo?: LogoProps;
  secondaryLogo?: LogoProps;
  showDivider?: boolean;
  text: TextProps;
  children?: React.ReactNode;
}

export const Navbar = ({
  primaryLogo,
  secondaryLogo,
  showDivider = true,
  text,
  children,
}: NavbarProps) => {
  const { base, container, leftSection, divider, text: textStyle, rightSection } = navbarVariants();

  const renderLogo = ({ link, img, size = "h-10 max-w-12", color = "black" }: LogoProps) => {
    const logoClasses = `${size} text-${color}`;

    if (!img) {
      return <img src={defaultLogo} alt="Default Logo" className={logoClasses} />;
    }

    if (typeof img === "string") {
      return <img src={img} alt="Logo" className={logoClasses} />;
    }

    const LogoComponent = img;
    return (
      <a href={link || "#"} style={{ color: color }}>
        <LogoComponent className={logoClasses} />
      </a>
    );
  };

  const renderText = ({ text, link, className = "" }: TextProps) => {
    const textClasses = `${textStyle()} ${className}`;
    return (
      <a href={link || "#"} className={textClasses}>
        {text}
      </a>
    );
  };

  return (
    <nav className={base()}>
      <div className={container()}>
        <div className={leftSection()}>
          {renderLogo(primaryLogo || {})}
          {showDivider && <div className={divider()}></div>}
          <div className="flex items-center gap-2">
            {secondaryLogo && renderLogo(secondaryLogo)}
            {renderText(text)}
          </div>
        </div>
        <div className={rightSection()}>{children}</div>
      </div>
    </nav>
  );
};
