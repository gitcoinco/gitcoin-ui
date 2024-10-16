import { ComponentPropsWithoutRef } from "react";

import { buttonVariants, type ButtonVariants } from "./button-variants";
import clsx from "clsx";

type ButtonProps = ComponentPropsWithoutRef<"button"> & ButtonVariants & { href?: never };
type AnchorProps = ComponentPropsWithoutRef<"a"> & ButtonVariants & { href?: string };
type ButtonOrLinkProps = ButtonProps | AnchorProps;
export const Button = ({ variant = "primary", size = "medium", ...props }: ButtonOrLinkProps) => {
  const className = clsx(buttonVariants({ size, variant }));

  if (props.href) {
    return <a className={className} {...(props as ComponentPropsWithoutRef<"a">)} />;
  } else {
    return <button className={className} {...(props as ComponentPropsWithoutRef<"button">)} />;
  }
};
