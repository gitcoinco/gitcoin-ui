import { Hex } from "viem";

import { CHECKER_ENDPOINT } from "./checkerClient";

interface EvaluationAnswerInput {
  questionIndex: number;
  answerEnum: number;
}

export interface EvaluationSummaryInput {
  questions: EvaluationAnswerInput[];
  summary: string;
}

export enum EVALUATION_STATUS {
  APPROVED = "approved",
  REJECTED = "rejected",
  UNCERTAIN = "uncertain",
}

export interface EvaluationBody {
  chainId: number;
  alloPoolId: string;
  alloApplicationId: string;
  cid: string;
  evaluator: string;
  summaryInput: EvaluationSummaryInput;
  evaluationStatus: EVALUATION_STATUS;
  signature: Hex;
}

export interface SyncPoolBody {
  chainId: number;
  alloPoolId: string;
}

export async function submitEvaluation(
  evaluationBody: EvaluationBody,
): Promise<{ evaluationId: string }> {
  const url = `${CHECKER_ENDPOINT}/api/evaluate`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...evaluationBody, evaluatorType: "human" }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${response.status} - ${errorData.message || "Unknown error"}`);
    }

    const data = await response.json();
    return data.evaluationId;
  } catch (error) {
    console.error("Error submitting evaluation:", error);
    throw error;
  }
}

export async function syncPool(syncPoolBody: SyncPoolBody): Promise<boolean> {
  const url = `${CHECKER_ENDPOINT}/api/pools`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...syncPoolBody,
        skipEvaluation: true,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error: ${response.status} - ${errorData.message || "Unknown error"}`);
    }

    return true;
  } catch (error) {
    console.error("Error syncing pool:", error);
    throw error;
  }
}
