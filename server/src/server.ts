import express from "express";
import { getDb } from "./db";
import { User, USER_COLLECTION } from "./models/user";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.post("/api/users", async (req, res) => {
  const { uid, name, email } = req.body;
  const db = getDb();

  try {
    const newUser: User = {
      uid,
      name,
      email,
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
