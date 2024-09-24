import React from "react";
import { Question } from "../utils/types";
import { Flex, Button, Box } from "@chakra-ui/react";

interface QuizQuestionProps {
  question: Question & { userAnswer?: number };
  onAnswer: (selectedAnswer: number) => void;
}

//問題文と回答選択肢を表示するコンポーネント
const QuizQuestion: React.FC<QuizQuestionProps> = ({ question, onAnswer }) => {
  return (
    <Box>
      <Box className="text-xl">{question?.text}</Box>
      <Flex
        justify="center"
        align="center"
        wrap="wrap"
        gap={10}
        className="mt-8 flex-col md:flex-row"
      >
        {question?.options.map((option, index) => (
          <Button
            key={index}
            className="border border-solid p-2 border-teal-400 rounded-sm"
            variant={question.userAnswer !== undefined ? "solid" : "outline"}
            onClick={() => onAnswer(index)}
            isDisabled={question.userAnswer !== undefined}
            style={{
              backgroundColor:
                question.userAnswer === index
                  ? index === question.correctAnswer
                    ? "lightgreen"
                    : "lightcoral"
                  : question.userAnswer !== undefined && index === question.correctAnswer
                  ? "lightgreen"
                  : "white",
            }}
          >
            {option}
          </Button>
        ))}
      </Flex>
    </Box>
  );
};

export default QuizQuestion;
