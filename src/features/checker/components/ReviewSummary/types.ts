export interface EvaluationQuestionProps {
  question: string;
  answer: string;
}

export interface EvaluationSummaryProps {
  evaluator: string;
  status: string;
  evaluatorType: string;
  evaluation: EvaluationQuestionProps[];
  summary: string;
  lastUpdatedAt: string;
}
