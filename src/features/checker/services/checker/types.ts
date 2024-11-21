export interface Application {
  alloApplicationId: string;
  evaluations: {
    evaluatorScore: number;
    evaluatorType: string;
    evaluator: string;
    lastUpdatedAt: string;
    evaluationAnswers: { answer: string }[];
    metadataCid: string;
  }[];
}
export interface PoolData {
  evaluationQuestions: { questionIndex: number; question: string }[];
  applications: Application[];
}
