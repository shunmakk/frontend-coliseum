import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { Button } from "@chakra-ui/react";

export const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // ユーザー情報をサーバーに送信
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: user.uid,
          name: name,
          email: email,
        }),
      });

      //firestoreにデータ保存
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        name: name,
        email: email,
        totalGames: 0,
        totalScore: 0,
      });

      if (response.ok) {
        navigate("/start");
      } else {
        throw new Error("サインアップエラー");
      }
    } catch (error) {
      console.error("予期せぬエラーが発生しました", error);
    }
  };

  return (
    <div>
      <h2 className="text-5xl">Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <label id="username">ユーザーネーム(8文字以内)</label>
        <input
          type="text"
          name="username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          maxLength={8}
          required
        />
        <label id="email">メールアドレス</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <label id="password">パスワード</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <Button
          type="submit"
          colorScheme="blue"
          width="full"
          className="mt-6 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition duration-300 transform hover:scale-105"
        >
          サインアップ
        </Button>
      </form>
    </div>
  );
};
