import express from "express";
import { connectToDatabase, getDb } from "./db";
import { QUESTION_COLLECTION, Question } from "./models/question";
import { USER_COLLECTION, User } from "./models/user";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

connectToDatabase();

app.get("/api/questions/:difficulty", async (req, res) => {
  const difficulty = req.params.difficulty as "easy" | "medium" | "hard";
  const db = getDb();

  try {
    const questions = await db
      .collection<Question>(QUESTION_COLLECTION)
      .aggregate([
        { $match: { difficulty: difficulty } },
        { $sample: { size: 5 } },
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

app.get("/api/leaderboard/:userId", async (req, res) => {
  const db = getDb();
  const { userId } = req.params;

  try {
    //Top10のスコア獲得
    const topScores = await db
      .collection<User>(USER_COLLECTION)
      .find()
      .sort({ totalScore: -1 })
      .limit(10)
      .project({ name: 1, totalScore: 1, uid: 1 })
      .toArray();

    //ユーザー自身のスコアとランクを取得
    const user = await db
      .collection<User>(USER_COLLECTION)
      .findOne({ uid: userId });
    const userRank = user
      ? (await db
          .collection<User>(USER_COLLECTION)
          .countDocuments({ totalScore: { $gt: user.totalScore } })) + 1
      : null;

    //JSOn形式で返却
    res.json({
      topScores: topScores.map((user) => ({
        name: user.name,
        topScores: user.totalScore,
        isCurrentUser: user.uid === userId,
      })),
      userRank,
      UserScore: user ? user.totalScore : null,
    });
  } catch (err) {
    console.log("Error fetching leaderboard:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
