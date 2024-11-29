import { Hex } from "viem";

import { Step } from "@/components/ProgressModal";

import { CheckerRouter } from "~checker/routers";
import { CheckerProvider } from "~checker/store";
import { EvaluationBody, ReviewBody } from "~checker/types";

export interface CheckerProps {
  address: Hex;
  poolId: string;
  chainId: number;
  setEvaluationBody: (body: EvaluationBody) => void;
  isSigning: boolean;
  isSuccess: boolean;
  isEvaluating: boolean;
  isError: boolean;
  isErrorSigning: boolean;
  steps: Step[];
  setReviewBody: (reviewBody: ReviewBody | null) => void;
  isReviewing: boolean;
}

export const Checker = (props: CheckerProps) => {
  return (
    <CheckerProvider>
      <CheckerRouter {...props} />
    </CheckerProvider>
  );
};