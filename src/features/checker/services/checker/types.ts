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
}

export interface CheckerApiApplication {
  alloApplicationId: string;
  evaluations: Evaluation[];
}

export interface CheckerApiEvaluationQuestion {
  questionIndex: number;
  question: string;
}

export interface CheckerApiPoolData {
  evaluationQuestions: CheckerApiEvaluationQuestion[];
  applications: CheckerApiApplication[];
}
