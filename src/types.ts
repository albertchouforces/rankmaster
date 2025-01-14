export type QuizType = 'navy' | 'army' | 'air' | 'combined';

export interface RankData {
  id: number;
  rank: string;
  description: string;
  fact: string;
  imageUrl: string;
}

export interface HighScoreEntry {
  userName: string;
  score: number;
  accuracy: number;
  time: number;
  date: string;
}

export interface BestRun {
  userName: string;
  time: number;
  score: number;
  accuracy: number;
}

export interface QuizStats {
  highScore: number;
  bestRun: BestRun | null;
  highScores: HighScoreEntry[];
}
