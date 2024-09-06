import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Complete: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score = 0, total = 0 } =
    (location.state as { score?: number; total?: number }) || {};

  return (
    <div>
      <h1>リザルト画面</h1>
      <p>
        あなたのスコア: {score} / {total}
      </p>
      <button onClick={() => navigate("/start")}>ホームに戻る</button>
      <button onClick={() => navigate("/profile")}>プロフィールページ</button>
    </div>
  );
};

export default Complete;
