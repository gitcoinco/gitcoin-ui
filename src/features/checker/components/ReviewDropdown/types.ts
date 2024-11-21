export interface EvaluationQuestionProps {
  question: string;
  answer: "YES" | "NO" | "UNCERTAIN";
}

export interface EvaluationSummaryProps {
  evaluator: string;
  evaluationStatus: "approved" | "rejected" | "pending" | "uncertain";
  evaluatorType: "human" | "llm_gpt3";
  evaluation: EvaluationQuestionProps[];
  summary: string;
  lastUpdatedAt: string;
}
