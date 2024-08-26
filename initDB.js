const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/quizapp";
const client = new MongoClient(uri);

async function initDatabase() {
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection("questions");

    // サンプル問題データ
    const questions = [
      {
        difficulty: "easy",
        text: "1 + 1 = ?",
        options: ["1", "2", "3", "4"],
        correctAnswer: 1,
      },
      // ... 他の問題を追加 (各難易度100問ずつ)
    ];

    await collection.insertMany(questions);
    console.log("Database initialized with sample questions");
  } catch (error) {
    console.error("Error initializing database:", error);
  } finally {
    await client.close();
  }
}

initDatabase();
