import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { CiLogout } from "react-icons/ci";

const BackHomeButton: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        onClick={() => navigate("/start")}
        leftIcon={<CiLogout />}
        colorScheme="orange"
        variant="ghost"
      >
        ホームに戻る
      </Button>
    </div>
  );
};

export default BackHomeButton;
