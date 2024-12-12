export type QuizType = 'navy' | 'army' | 'air';

export interface RankData {
  id: number;
  rank: string;
  description: string;
  fact: string;
  imageUrl: string;
}

export interface BestRun {
  time: number;
  score: number;
  accuracy: number;
}

export interface QuizStats {
  highScore: number;
  bestRun: BestRun | null;
}
