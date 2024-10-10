import express from "express";
import { connectToDatabase, getDb } from "./db";
import { QUESTION_COLLECTION, Question } from "./models/question";
import { USER_COLLECTION, User } from "./models/user";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5000;

//ミドルウェア設定
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

connectToDatabase();

app.get("/api/questions/:difficulty", async (req, res) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  const difficulty = req.params.difficulty as "easy" | "medium" | "hard";
  const db = getDb();

  try {
    const questions = await db
      .collection<Question>(QUESTION_COLLECTION)
      .aggregate([
        { $match: { difficulty: difficulty } },
        { $sample: { size: 5 } },
        {
          $project: {
            _id: 0,
            text: 1,
            options: 1,
            correctAnswer: 1,
            explanation: 1,
          },
        },
      ])
      .toArray();

    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/users", async (req, res) => {
  const { uid, name, email } = req.body;
  const db = getDb();

  try {
    const newUser: User = {
      uid,
      name,
      email,
      totalGames: 0,
      totalScore: 0,
    };

    await db.collection<User>(USER_COLLECTION).insertOne(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
