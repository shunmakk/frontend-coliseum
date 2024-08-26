import React, { useState } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { error } from "console";

const Auth: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
    } catch (err) {
      console.error("サインインエラー", error);
    }
  };

  return (
    <div>
      <h1>サインイン</h1>
      <form onSubmit={handleSignIn}>
        <p>メールアドレス(*架空のメールアドレスでOK)</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="メールアドレスを入力してください"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワードを入力してください"
          required
        />
        <button type="submit">サインイン</button>
      </form>
      <p>
        アカウントが無い場合は作成して！ <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Auth;
