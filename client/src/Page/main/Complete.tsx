import React from "react";
import { useLocation } from "react-router-dom";
import BackHomeButton from "../../Components/BackHomeButton";
import ResultFace from "../../Components/ResultFace";
import ResultMessage from "../../Components/ResultMessage";

const Complete: React.FC = () => {
  const location = useLocation();
  const {
    score = 0,
    total = 0,
    difficulty,
  } = (location.state as { score?: number; total?: number; difficulty?: string }) || {};

  return (
    <div>
      <h1>リザルト画面</h1>
      <p>難易度:{difficulty}</p>
      <ResultFace score={score} />
      <ResultMessage score={score} difficulty={difficulty} />
      <p>
        あなたのスコア: {score} / {total}
      </p>
      <BackHomeButton />
    </div>
  );
};

export default Complete;
