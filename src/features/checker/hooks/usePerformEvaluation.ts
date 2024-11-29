import { useState, useEffect } from "react";

import { useMutation } from "@tanstack/react-query";
import { Hex } from "viem";

import { submitEvaluation } from "~checker/services/checker/api";

import { EvaluationBody } from "../types";

export const usePerformEvaluation = () => {
  const [evaluationBody, setEvaluationBody] = useState<EvaluationBody | null>(null);

  const handleSetEvaluationBody = (data: EvaluationBody) => {
    setEvaluationBody(data);
  };

  // Dummy signing function
  const dummySign = async (): Promise<Hex> => {
    return new Promise<Hex>((resolve) => {
      setTimeout(() => {
        resolve("0xdeadbeef");
      }, 3000);
    });
  };

  // Signing mutation
  const signingMutation = useMutation({
    mutationFn: dummySign,
  });

  // Evaluation mutation
  const evaluationMutation = useMutation({
    mutationFn: async (data: EvaluationBody & { signature: Hex }) => {
      return await submitEvaluation(data);
    },
  });

  // Trigger the signing mutation when evaluationBody is set
  useEffect(() => {
    if (evaluationBody) {
      signingMutation.mutate();
    }
  }, [evaluationBody]);

  // Trigger the evaluation mutation when signing is successful
  useEffect(() => {
    if (signingMutation.isSuccess && evaluationBody) {
      const signature = signingMutation.data;
      evaluationMutation.mutate({ ...evaluationBody, signature });
    }
  }, [signingMutation.isSuccess, evaluationBody]);

  return {
    setEvaluationBody: handleSetEvaluationBody,
    isSigning: signingMutation.isPending,
    isErrorSigning: signingMutation.isError,
    isEvaluating: evaluationMutation.isPending,
    isError: evaluationMutation.isError,
    isSuccess: evaluationMutation.isSuccess,
    data: evaluationMutation.data,
    error: evaluationMutation.error,
  };
};
