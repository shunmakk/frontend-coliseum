import React from "react";
import Modal from "./Modal";
import { Dispatch, SetStateAction } from "react";
import { Box, Button } from "@chakra-ui/react";

interface AnswerModalProps {
  show: boolean;
  isCorrect: boolean;
  isLastQuestion: boolean;
  correctAnswer: string;
  onClose: () => void;
  onNextQuestion: () => void;
  onComplete: () => void;
  showExplanation: boolean;
  setShowExplanation: Dispatch<SetStateAction<boolean>>;
  hide: boolean;
  setHide: Dispatch<SetStateAction<boolean>>;
}

//回答後の結果と次の問題へのナビゲーションを表示するモーダル
const QuizAnswerModal: React.FC<AnswerModalProps> = ({
  show,
  isCorrect,
  isLastQuestion,
  correctAnswer,
  onClose,
  onNextQuestion,
  onComplete,
  showExplanation,
  setShowExplanation,
  hide,
  setHide,
}) => {
  const identificationButton = () => {
    setShowExplanation((explanation) => !explanation);
    setHide((hide) => !hide);
  };

  return (
    <Box>
      {hide ? null : (
        <Modal show={show} onClose={onClose} explanation={false}>
          <h3 className="p-4 font-bold text-2xl" style={{ color: isCorrect ? "red" : "blue" }}>
            {isCorrect ? "正解！" : "不正解"}
          </h3>
          <p className="mb-2">
            {isCorrect
              ? isLastQuestion
                ? "これでクイズは終了です！"
                : "次の問題に進みましょう！"
              : `正解は: ${correctAnswer}`}
          </p>
          {!isLastQuestion && (
            <Button className="border border-emerald-400 p-1 mr-1" onClick={onNextQuestion}>
              次の問題へ
            </Button>
          )}
          {isLastQuestion && (
            <Button className="border border-emerald-400 p-1 mr-1" onClick={onComplete}>
              リザルト画面へ
            </Button>
          )}
          <Button className="border border-lime-400 p-1" onClick={identificationButton}>
            {showExplanation ? "解説を閉じる" : "解説を見る"}
          </Button>
        </Modal>
      )}
    </Box>
  );
};

export default QuizAnswerModal;
