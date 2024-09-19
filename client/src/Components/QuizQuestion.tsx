import React from "react";
import { Question } from "../types";

interface QuizQuestionProps {
  question: Question & { userAnswer?: number };
  onAnswer: (selectedAnswer: number) => void;
}

//問題文と回答選択肢を表示するコンポーネント
const QuizQuestion: React.FC<QuizQuestionProps> = ({ question, onAnswer }) => {
  return (
    <div>
      <p>{question?.text}</p>
      {question?.options.map((option, index) => (
        <button
          key={index}
          onClick={() => onAnswer(index)}
          disabled={question.userAnswer !== undefined}
          style={{
            backgroundColor:
              question.userAnswer === index
                ? index === question.correctAnswer
                  ? "lightgreen"
                  : "lightcoral"
                : question.userAnswer !== undefined &&
                  index === question.correctAnswer
                ? "lightgreen"
                : "white",
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default QuizQuestion;
