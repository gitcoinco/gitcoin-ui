import { Hex } from "viem";

import { CheckerProvider } from "~checker/store";

import { CheckerRouter } from "./CheckerRouter";

export interface CheckerProps {
  address: Hex;
  roundId: string;
  chainId: number;
}

export const Checker = (props: CheckerProps) => {
  return (
    <CheckerProvider>
      <CheckerRouter {...props} />
    </CheckerProvider>
  );
};
