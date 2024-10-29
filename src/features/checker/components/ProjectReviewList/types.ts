interface Review {
  reviewer: `0x${string}`;
  approved: boolean;
}

export interface ProjectReview {
  id: number;
  name: string;
  date: Date;
  avatarUrl: string;
  reviews: Review[];
  aiSuggestion: number;
  scoreAverage: number;
}
