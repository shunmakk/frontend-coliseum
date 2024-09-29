import React from "react";
import { useLocation } from "react-router-dom";
import BackHomeButton from "../../Components/BackHomeButton";
import ResultFace from "../../Components/ResultFace";
import ResultMessage from "../../Components/ResultMessage";
import { Box } from "@chakra-ui/react";

const Complete: React.FC = () => {
  const location = useLocation();
  const {
    score = 0,
    total = 0,
    difficulty,
  } = (location.state as { score?: number; total?: number; difficulty?: string }) || {};

  return (
    <Box className="min-h-screen bg-gradient-to-br flex  items-center justify-center from-blue-100 via-purple-100 to-pink-100 py-10 px-4 pb-20">
      <Box className="w-full max-w-4xl  bg-slate-50 bg-opacity-70 rounded-xl shadow-xl">
        <Box className=" p-12">
          <Box className="mb-6 text-center">
            <h1 className="font-bold text-3xl mb-3">リザルト画面</h1>
            <p className="text-sm font-medium bg-gray-300 px-3 py-1 rounded-full inline-block">
              難易度:{" "}
              <span className="font-bold">
                {(() => {
                  switch (difficulty) {
                    case "easy":
                      return "初級";
                    case "medium":
                      return "中級";
                    case "hard":
                      return "上級";
                    default:
                      return "不明";
                  }
                })()}
              </span>
            </p>
          </Box>
          <Box className="text-center my-14">
            <p className="text-2xl mb:text-4xl">
              <span className="text-xl mb:text-3xl">あなたのスコア:</span> {score} / {total}
            </p>
          </Box>
          <Box className="flex items-center justify-center gap-5 mt-5">
            <ResultFace score={score} />
            <ResultMessage score={score} difficulty={difficulty} />
          </Box>
        </Box>
        <Box className="text-right pr-8 pb-6">
          <BackHomeButton />
        </Box>
      </Box>
    </Box>
  );
};

export default Complete;
