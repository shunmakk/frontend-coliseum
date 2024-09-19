import React from "react";
import Modal from "./Modal";
import { Dispatch, SetStateAction } from "react";

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
}) => {
  const identificationButton = () => {
    if (showExplanation === true) {
      setShowExplanation(false);
    } else {
      setShowExplanation(true);
    }
  };

  return (
    <div>
      <Modal show={show} onClose={onClose} explanation={false}>
        <h3>{isCorrect ? "正解！" : "不正解"}</h3>
        <p>
          {isCorrect
            ? isLastQuestion
              ? "これでクイズは終了です！"
              : "次の問題に進みましょう！"
            : `正解は: ${correctAnswer}`}
        </p>
        {!isLastQuestion && (
          <button onClick={onNextQuestion}>次の問題へ</button>
        )}
        {isLastQuestion && <button onClick={onComplete}>リザルト画面へ</button>}
        <button onClick={identificationButton}>
          {showExplanation ? "解説を閉じる" : "解説を見る"}
        </button>
      </Modal>
    </div>
  );
};

export default QuizAnswerModal;
