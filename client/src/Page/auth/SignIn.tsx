import React, { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { FirebaseError } from "firebase/app";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/start");
    } catch (error) {
      console.error("Sign in error:", error);
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/invalid-credential":
            window.alert("メールアドレスまたはパスワードが正しくありません");
            break;
          case "auth/user-disabled":
            window.alert("このアカウントは無効です");
            break;
          case "auth/user-not-found":
            window.alert(
              "アカウントは見つかりません。サインアップする必要があるかもしれません"
            );
            break;
          default:
            window.alert("サインインに失敗しました。もう一度お試しください");
        }
      } else {
        window.confirm("予期せぬエラーが発生しました");
      }
    }
  };

  return (
    <div>
      <h2>サインイン</h2>
      <form onSubmit={handleSignIn}>
        <label id="email">メールアドレス</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <label id="password">パスワード</label>
        <input
          type="passwxord"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">サインインする</button>
      </form>
      <p>
        アカウントがない場合は、<Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default SignIn;
