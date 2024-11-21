export interface EvaluationAnswer {
  answer: string;
  evaluationQuestion?: {
    question: string;
  };
}

export interface Evaluation {
  evaluator: string;
  evaluationStatus: "APPROVED" | "REJECTED" | "PENDING" | "UNCERTAIN";
  evaluatorType: "HUMAN" | "LLM_GPT3";
  evaluatorScore: number;
  summary: string;
  lastUpdatedAt: string;
  evaluationAnswers: EvaluationAnswer[];
  metadataCid?: string;
}

export interface Application {
  alloApplicationId: string;
  evaluations: Evaluation[];
}
export interface PoolData {
  evaluationQuestions: { questionIndex: number; question: string }[];
  applications: Application[];
}
