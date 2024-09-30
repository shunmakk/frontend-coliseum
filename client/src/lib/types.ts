export type Difficulty = "easy" | "medium" | "hard";

export interface Question {
  id: string;
  difficulty: Difficulty;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ProfileData {
  name: string;
  email: string;
  totalGames: number;
  totalScore: number;
}
