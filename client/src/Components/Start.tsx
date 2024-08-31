import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Difficulty } from "../types";
// import { auth } from "../firebase";

const Start: React.FC = () => {
  //   const user = auth.currentUser;
  const navigate = useNavigate();

  const handleDiffcultySelect = (difficulty: Difficulty) => {
    navigate(`/quiz/${difficulty}`);
  };

  return (
    <div>
      {/* <p>{user?.displayName}さん</p> */}
      <h1>フロントエンドコロシアム</h1>
      <h2>難易度を選択してください：</h2>
      <button onClick={() => handleDiffcultySelect("easy")}>
        難易度(低) html,css,javascriptに関する問題
      </button>
      <button onClick={() => handleDiffcultySelect("medium")}>
        難易度(中) TypeScript、React,vue.jsに関する問題
      </button>
      <button onClick={() => handleDiffcultySelect("hard")}>
        難易度(高) フロントエンドのパフォーマンスを問う問題
      </button>
      <p>
        <Link to="/profile">プロフィール</Link>
      </p>
    </div>
  );
};

export default Start;
