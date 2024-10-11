import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  Heading,
  Flex,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import "../auth/Custom.css";

export const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ユーザー情報をサーバーに送信
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: user.uid,
          name: name,
          email: email,
        }),
      });

      //firestoreにデータ保存
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        name: name,
        email: email,
        totalGames: 0,
        totalScore: 0,
      });

      if (response.ok) {
        navigate("/start");
      } else {
        throw new Error("サインアップエラー");
      }
    } catch (error) {
      console.error("予期せぬエラーが発生しました", error);
    }
  };

  return (
    <Box className="w-full max-w-3xl p-12 bg-white rounded-xl shadow-2xl">
      <VStack spacing={6} align="stretch">
        <Heading as="h2" textAlign="center" className="text-gray-800 text-2xl my-4 font-semibold">
          登録ページ
        </Heading>
        <form onSubmit={handleSignUp} className="my-5">
          <FormControl id="username" isRequired className="mb-3 md:mb-5">
            <Flex className="flex-col md:flex-row md:items-center">
              <label className="text-gray-700 md:w-1/4 mb-1 md:mb-0 md:text-lg font-bold ">
                ユーザーネーム
              </label>
              <InputGroup className="w-3/4">
                <InputLeftElement pointerEvents="none"></InputLeftElement>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ユーザーネーム (8文字以内)"
                  maxLength={8}
                  className="pl-5 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:to-purple-100 transition duration-200"
                />
              </InputGroup>
            </Flex>
          </FormControl>
          <FormControl id="email" isRequired className="mb-3 md:mb-5">
            <Flex className="flex-col md:flex-row md:items-center">
              <label className="text-gray-700 md:w-1/4 mb-1 md:mb-0 md:text-lg font-bold ">
                メールアドレス
              </label>
              <InputGroup className="w-3/4">
                <InputLeftElement pointerEvents="none"></InputLeftElement>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="メールアドレスを入力"
                  className="pl-5 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:to-purple-100 transition duration-200"
                />
              </InputGroup>
            </Flex>
          </FormControl>
          <FormControl id="password" isRequired>
            <Flex className="flex-col md:flex-row md:items-center">
              <label className="text-gray-700 md:w-1/4 mb-1 md:mb-0 md:text-lg font-bold ">
                パスワード
              </label>
              <InputGroup className="w-3/4">
                <InputLeftElement pointerEvents="none"></InputLeftElement>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="パスワードを入力"
                  className="pl-5 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:to-purple-100 transition duration-200"
                />
              </InputGroup>
            </Flex>
          </FormControl>
          <div className="flex items-center justify-center mt-7">
            <Button
              type="submit"
              colorScheme="blue"
              width="300px"
              className="py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition duration-300 transform hover:scale-105"
            >
              サインアップ
            </Button>
          </div>
        </form>
        <Text textAlign="center" className="text-gray-600">
          すでにアカウントをお持ちの場合は、
          <Link to="/" className="text-blue-600 hover:underline font-medium">
            サインイン
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};
