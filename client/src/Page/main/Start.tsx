import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Difficulty } from "../../utils/types";
import LogoutButton from "../../Components/LogoutButton";
import { Box, VStack, Heading, Text, Button, Flex, Container, Tooltip } from "@chakra-ui/react";
import { FaCode, FaReact, FaRocket, FaUser, FaTrophy } from "react-icons/fa";

const difficultyOptions: Array<{
  level: Difficulty;
  label: string;
  description: string;
  description2: string;
  icon: React.ElementType;
  color: string;
}> = [
  {
    level: "easy",
    label: "初級",
    description: "HTML, CSS, JavaScript",
    description2: "基礎的な問題です",
    icon: FaCode,
    color: "green",
  },
  {
    level: "medium",
    label: "中級",
    description: "TypeScript, React, Vue.js",
    description2: "フレームワーク、TypeScriptに関する問題です",
    icon: FaReact,
    color: "blue",
  },
  {
    level: "hard",
    label: "上級",
    description: "フロントエンドのパフォーマンス",
    description2: "あなたがフロントエンドエンジニアなら解ける??",
    icon: FaRocket,
    color: "red",
  },
];

const Start: React.FC = () => {
  const navigate = useNavigate();
  const [, setSelectedDifficulty] = useState<Difficulty | null>(null);

  const handleDifficultySelect = (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
    const confirm = window.confirm(`難易度${difficulty}でクイズを開始しますか？`);
    if (confirm) {
      navigate(`/quiz/${difficulty}`);
    }
  };

  return (
    <Box className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-10 px-4 pb-20">
      <Container maxW="4xl">
        <VStack spacing={8} align="stretch">
          <Heading as="h1" textAlign="center" className="text-gray-800 my-4 md:text-3xl text-2xl">
            フロントエンドコロシアム
          </Heading>

          <Text as="h2" fontSize="xl" textAlign="center" className="text-gray-600 font-bold">
            難易度を選択してクイズを開始
          </Text>

          <Flex
            direction={{ base: "column", md: "row" }}
            className="md:mt-32 mt-2"
            justify="center"
            align="center"
            wrap="wrap"
            gap={6}
          >
            {difficultyOptions.map((option) => (
              <div
                className="w-full md:w-64 bg-slate-50  px-6 py-6 mx-5  my-3 bg-opacity-70 rounded shadow-md"
                key={option.level}
              >
                <Tooltip
                  label={`${option.description2}`}
                  placement="top"
                  className="bg-blue-300 rounded mb-10 py-4 px-2"
                >
                  <Button
                    onClick={() => handleDifficultySelect(option.level)}
                    colorScheme={option.color}
                    size="lg"
                    height="120px"
                    width="100%"
                    borderRadius="lg"
                    className="flex flex-col items-center justify-center text-left p-4 transition-all duration-300 ease-in-out"
                    _hover={{
                      boxShadow: "xl",
                    }}
                  >
                    <option.icon size="2em" className="mb-2" />
                    <Text className="text-base" fontWeight="bold" mb={5}>
                      {option.label}
                    </Text>
                    <Text className="text-xs">{option.description}</Text>
                  </Button>
                </Tooltip>
                <div className="flex tems-center justify-center">
                  <Button
                    onClick={() => handleDifficultySelect(option.level)}
                    className="bg-blue-400 py-1 px-3 rounded-md text-slate-100 "
                  >
                    開始
                  </Button>
                </div>
              </div>
            ))}
          </Flex>
        </VStack>
      </Container>
      {/* フッター　別でコンポーネント作る必要ありそう */}
      <Flex
        position="fixed"
        bottom={0}
        left={0}
        right={0}
        bg="#fff"
        boxShadow="0 -2px 10px rgba(0,0,0,0.1)"
        justifyContent="space-around"
        py={30}
        px={24}
        // とりあえず768px以下の画面は非表示に
        css={{
          "@media screen and (max-width: 767px)": {
            display: "none",
          },
        }}
      >
        <Link to="/profile">
          <Button leftIcon={<FaUser />} colorScheme="teal" variant="ghost">
            プロフィール
          </Button>
        </Link>
        <Link to="/leaderboard">
          <Button leftIcon={<FaTrophy />} colorScheme="orange" variant="ghost">
            ランキング
          </Button>
        </Link>
        <LogoutButton />
      </Flex>
    </Box>
  );
};

export default Start;
