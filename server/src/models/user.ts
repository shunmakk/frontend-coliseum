import { ObjectId } from "mongodb";

export interface User {
  _id?: ObjectId;
  uid: string; // Firebase UID
  name: string;
  email: string;
  totalGames: number;
  totalScore: number;
}

export const USER_COLLECTION = "users";
