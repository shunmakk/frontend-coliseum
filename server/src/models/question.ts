import { ObjectId } from "mongodb";

export interface Question {
  _id?: ObjectId;
  difficulty: "easy" | "medium" | "hard";
  text: string;
  options: string[];
  correctAnswer: number;
}

export const QUESTION_COLLECTION = "questions";
