import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Difficulty } from "../../lib/types";
import { Box, Heading, Text, Button, Flex, Container, Tooltip } from "@chakra-ui/react";
import Footer from "../../Components/Footer";
import { DifficultyOptions } from "../../lib/DifficultyOptions";

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
    <>
      {/* ヘッダー部分 */}
      <Box position="absolute" top="50" left="0" right="0" p={4}>
        <Heading as="h1" textAlign="center" className="text-gray-800 mt-4 md:text-3xl text-2xl">
          フロントエンドコロシアム
        </Heading>
        <Text as="h2" fontSize="xl" textAlign="center" className="text-gray-600 font-bold mt-2">
          難易度を選択してクイズを開始
        </Text>
      </Box>

      {/* 難易度選択部分 */}
      <Flex alignItems="center" justifyContent="center">
        <Container maxW="4xl">
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="center"
            align="center"
            wrap="wrap"
            gap={6}
            className="mt-32 md:mt-0"
          >
            {DifficultyOptions.map((option) => (
              <Box
                key={option.level}
                className="w-full md:w-64 bg-slate-50 px-6 py-6 mx-5 my-3 bg-opacity-70 rounded shadow-md"
              >
                <Tooltip
                  label={option.description2}
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
                <Flex justifyContent="center" mt={4}>
                  <Button
                    onClick={() => handleDifficultySelect(option.level)}
                    className="bg-blue-400 py-1 px-3 rounded-md text-slate-100"
                  >
                    開始
                  </Button>
                </Flex>
              </Box>
            ))}
          </Flex>
        </Container>
      </Flex>

      <Footer />
    </>
  );
};

export default Start;
