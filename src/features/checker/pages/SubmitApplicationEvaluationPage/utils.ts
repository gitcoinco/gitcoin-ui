// src/components/SubmitApplicationEvaluation/statusHandler.ts
import { match } from "ts-pattern";

export type ActionState =
  | { status: "idle" }
  | { status: "signing" }
  | { status: "signingError" }
  | { status: "evaluating" }
  | { status: "evaluatingError" }
  | { status: "success" };

export interface ButtonConfig {
  text: string;
  disabled: boolean;
}

export const getButtonConfig = (status: ActionState["status"]): ButtonConfig => {
  return match(status)
    .with("idle", () => ({ text: "Save", disabled: false }))
    .with("signing", () => ({ text: "Signing...", disabled: true }))
    .with("signingError", () => ({ text: "Try again", disabled: false }))
    .with("evaluating", () => ({ text: "Saving...", disabled: true }))
    .with("evaluatingError", () => ({ text: "Try again", disabled: false }))
    .with("success", () => ({ text: "Save", disabled: false }))
    .otherwise(() => ({ text: "Save", disabled: false }));
};

export const getAnswerEnum = (answer: string): number => {
  return match(answer)
    .with("yes", () => 0)
    .with("no", () => 1)
    .with("uncertain", () => 2)
    .otherwise(() => 2);
};
