import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Difficulty, Question } from "../../utils/types";
import { auth, db } from "../../firebase";
import { doc, increment, updateDoc, getDoc } from "firebase/firestore";
import LoadingOrError from "../../Components/LoadingOrError";
import QuizQuestion from "../../Components/QuizQuestion";
import QuizAnswerModal from "../../Components/QuizAnswerModal";
import QuizExplanationModal from "../../Components/QuizExplanationModal";
import { Box } from "@chakra-ui/react";

const QUIZ_STATE_KEY = "quizState";

interface QuizState {
  questions: (Question & { userAnswer?: number })[];
  currentQuestionIndex: number;
  score: number;
  difficulty: Difficulty;
}

const Quiz: React.FC = () => {
  const { difficulty } = useParams<{ difficulty: Difficulty }>();
  const navigate = useNavigate();
  const [quizState, setQuizState] = useState<QuizState | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  //解説を見るを選択した時、このモーダルを画面に表示されないようにする
  const [hide, setHide] = useState<boolean>(false);

  const fetchQuestions = useCallback(async () => {
    try {
      const response = await fetch(`/api/questions/${difficulty}`, {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      if (response.ok) {
        const questions = await response.json();
        setQuizState({
          questions,
          currentQuestionIndex: 0,
          score: 0,
          difficulty: difficulty as Difficulty,
        });
      } else {
        console.error("questionsのフェッチに失敗しました");
      }
    } catch (error) {
      console.error("questionsのフェッチ周りのエラー", error);
    }
  }, [difficulty]);

  const recoverQuizState = (savedState: QuizState): QuizState => {
    const recoveredScore = savedState.questions.reduce((score, question) => {
      if (question.userAnswer === question.correctAnswer) {
        return score + 1;
      }
      return score;
    }, 0);

    return {
      ...savedState,
      score: recoveredScore,
    };
  };

  useEffect(() => {
    const savedState = localStorage.getItem(QUIZ_STATE_KEY);
    if (savedState && JSON.parse(savedState).difficulty === difficulty) {
      const parsedState = JSON.parse(savedState);
      setQuizState(recoverQuizState(parsedState));
    } else {
      localStorage.removeItem(QUIZ_STATE_KEY);
      fetchQuestions();
    }
  }, [fetchQuestions, difficulty]);

  useEffect(() => {
    if (quizState) {
      localStorage.setItem(QUIZ_STATE_KEY, JSON.stringify(quizState));
    }
  }, [quizState]);

  const handleAnswer = (selectedAnswer: number) => {
    if (!quizState) return;

    const currentQuestion = quizState.questions[quizState.currentQuestionIndex];

    if (currentQuestion.userAnswer !== undefined) {
      console.log("既に回答済み");
      return;
    }

    const correct = selectedAnswer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowModal(true);
    setQuizState((prevState) => {
      if (!prevState) return null;
      const newQuestions = [...prevState.questions];
      newQuestions[prevState.currentQuestionIndex] = {
        ...currentQuestion,
        userAnswer: selectedAnswer,
      };
      return {
        ...prevState,
        questions: newQuestions,
        score: correct ? prevState.score + 1 : prevState.score,
      };
    });
  };

  const nextQuestion = () => {
    setShowModal(false);
    setShowExplanation(false);
    setHide(false);
    setQuizState((prevState) => {
      if (!prevState) return null;
      const nextIndex = prevState.currentQuestionIndex + 1;
      if (nextIndex >= prevState.questions.length) {
        handleComplete();
        return prevState;
      }
      return {
        ...prevState,
        currentQuestionIndex: nextIndex,
      };
    });
  };

  const handleComplete = async () => {
    if (!quizState) return;
    const user = auth.currentUser;
    if (user) {
      try {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        const userData = userDoc.data();
        const newTotalGames = (userData?.totalGames || 0) + 1;
        const newTotalScore = (userData?.totalScore || 0) + quizState.score;
        const newAverageScore = newTotalScore / newTotalGames;
        await updateDoc(userRef, {
          totalGames: increment(1),
          totalScore: increment(quizState.score),
          averageScore: newAverageScore,
        });
      } catch (error) {
        console.error("スコアのupdateに失敗しました", error);
      }
    }
    localStorage.removeItem(QUIZ_STATE_KEY);
    navigate("/complete", {
      state: { score: quizState.score, total: quizState.questions.length, difficulty: difficulty },
    });
  };

  if (!quizState) return <LoadingOrError />;

  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
  const isLastQuestion = quizState.currentQuestionIndex === quizState.questions.length - 1;

  return (
    <Box className="min-h-screen bg-gradient-to-br flex  items-center justify-center from-blue-100 via-purple-100 to-pink-100 py-10 px-4 pb-20">
      <Box className="w-full max-w-4xl p-12  bg-white bg-opacity-70 rounded-xl shadow-xl">
        <h2 className="text-2xl font-medium mb-3">
          問題{quizState.currentQuestionIndex + 1}/{quizState.questions.length}
        </h2>
        <QuizQuestion question={currentQuestion} onAnswer={handleAnswer} />
        <Box mt={6} maxW="md" mx="auto">
          <QuizAnswerModal
            show={showModal}
            isCorrect={isCorrect}
            isLastQuestion={isLastQuestion}
            correctAnswer={currentQuestion?.options[currentQuestion.correctAnswer]}
            onClose={() => setShowExplanation(false)}
            onNextQuestion={nextQuestion}
            onComplete={handleComplete}
            showExplanation={showExplanation}
            setShowExplanation={setShowExplanation}
            hide={hide}
            setHide={setHide}
          />
          <QuizExplanationModal
            show={showExplanation}
            explanation={currentQuestion?.explanation}
            onClose={nextQuestion}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Quiz;
