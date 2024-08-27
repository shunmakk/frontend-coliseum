export type Difficulty = "easy" | "medium" | "hard";

export interface Question {
  id: string;
  difficulty: Difficulty;
  text: string;
  options: string[];
  correctAnswer: number;
}
