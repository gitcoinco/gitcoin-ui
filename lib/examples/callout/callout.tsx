import type { PropsWithChildren } from "react";
import { calloutVariants, type CalloutVariants } from "./callout-variants";

export type CalloutProps = PropsWithChildren<CalloutVariants & { title: string }>;

export const Callout = ({ children, title, variant }: CalloutProps) => {
  return (
    <div className={calloutVariants({ variant })}>
      <h2 className="ui-text-2xl ui-font-semibold">{title}</h2>
      <p>{children}</p>
    </div>
  );
};
