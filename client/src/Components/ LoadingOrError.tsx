import React from "react";
import { Link } from "react-router-dom";

const LoadingOrError: React.FC = () => {
  return (
    <div>
      <p>ローディング...</p>
      <Link to="/start">ホーム画面に戻る</Link>
    </div>
  );
};

export default LoadingOrError;
