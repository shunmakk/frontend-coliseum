import { MongoClient, Db } from "mongodb";

let db: Db;

export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/quizapp";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    db = client.db();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Could not connect to MongoDB", error);
    process.exit(1);
  }
}

export function getDb(): Db {
  return db;
}
