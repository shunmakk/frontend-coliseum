import React from "react";
import Modal from "./Modal";

interface ExplanationModalProps {
  show: boolean;
  explanation: string;
  onClose: () => void;
}

//解説を表示するモーダル
const QuizExplanationModal: React.FC<ExplanationModalProps> = ({
  show,
  explanation,
  onClose,
}) => {
  return (
    <Modal show={show} onClose={onClose} explanation={true}>
      <h3>解説</h3>
      <p>{explanation}</p>
    </Modal>
  );
};

export default QuizExplanationModal;
