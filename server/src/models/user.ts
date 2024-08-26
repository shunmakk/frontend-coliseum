import { ObjectId } from "mongodb";

export interface User {
  _id?: ObjectId;
  uid: string; // Firebase UID
  name: string;
  email: string;
}

export const USER_COLLECTION = "users";
