import { useNavigate } from "react-router-dom";

const BackHomeButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate("/start")}>ホームに戻る</button>
    </div>
  );
};

export default BackHomeButton;
