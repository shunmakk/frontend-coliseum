import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Difficulty } from "../../types";
import { auth } from "../../firebase";

const Start: React.FC = () => {
  //   const user = auth.currentUser;
  const navigate = useNavigate();

  const handleDiffcultySelect = (difficulty: Difficulty) => {
    const confirm: boolean = window.confirm(
      `難易度${difficulty}でクイズを開始しますか？`
    );
    if (confirm) {
      navigate(`/quiz/${difficulty}`);
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("ログアウトしますか？");
    if (confirmLogout) {
      auth.signOut();
      navigate("/");
      setTimeout(() => {
        window.alert("ログアウトに成功しました");
      }, 500);
    }
    return;
  };

  return (
    <div>
      {/* <p>{user?.displayName}さん</p> */}
      <h1>フロントエンドコロシアム</h1>
      <h2>難易度を選択してください：</h2>
      <button onClick={() => handleDiffcultySelect("easy")}>
        難易度(easy) html,css,javascriptに関する問題
      </button>
      <button onClick={() => handleDiffcultySelect("medium")}>
        難易度(medium) TypeScript、React,vue.jsに関する問題
      </button>
      <button onClick={() => handleDiffcultySelect("hard")}>
        難易度(hard) フロントエンドのパフォーマンスを問う問題
      </button>
      <p>
        <Link to="/profile">プロフィール</Link>
        <Link to="/leaderboard">ランキング</Link>

        <button onClick={handleLogout}>ログアウト</button>
      </p>
    </div>
  );
};

export default Start;
