import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Difficulty, Question } from "../types";
import Modal from "./Modal";
import { auth, db } from "../firebase";
import { doc, increment, updateDoc } from "firebase/firestore";

const Quiz: React.FC = () => {
  const { difficulty } = useParams<{ difficulty: Difficulty }>();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setcurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  //難易度別に問題のデータを取り出す
  useEffect(() => {
    fetch(`/api/questions/${difficulty}`)
      .then((responce) => responce.json())
      .then((data) => setQuestions(data));
  }, [difficulty]);

  const handleAnswer = (selctedAnswer: number) => {
    const currentQuestion = questions[currentQuestionIndex];
    const correct = selctedAnswer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowModal(true);
    if (correct) {
      setScore(score + 1);
    }
  };

  const nextQuesion = () => {
    setShowModal(false);
    if (currentQuestionIndex < questions.length - 1) {
      setcurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        totalGames: increment(1),
        totalScore: increment(score),
      });
    }
    navigate("/comolete");
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <h2>
        問題{currentQuestionIndex + 1}/{questions.length}
      </h2>
      <p>{currentQuestion?.text}</p>
      {currentQuestion?.options.map((option, index) => (
        <button key={index} onClick={() => handleAnswer(index)}>
          {option}
        </button>
      ))}
      <Modal show={showModal} onClose={nextQuesion}>
        <h3>{isCorrect ? "正解！" : "不正解"}</h3>
        <p>
          {isCorrect
            ? "次の問題へ進みます。"
            : "正解は: " +
              currentQuestion?.options[currentQuestion.correctAnswer]}
        </p>
      </Modal>
    </div>
  );
};
export default Quiz;
