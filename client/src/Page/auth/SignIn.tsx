import React, { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  Box,
  Button,
  FormControl,
  Input,
  VStack,
  Heading,
  InputGroup,
  InputLeftElement,
  Flex,
  Text,
} from "@chakra-ui/react";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/start");
    } catch (error) {
      console.error("Sign in error:", error);
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/invalid-credential":
            window.alert("メールアドレスまたはパスワードが正しくありません");
            break;
          case "auth/user-disabled":
            window.alert("このアカウントは無効です");
            break;
          case "auth/user-not-found":
            window.alert(
              "アカウントは見つかりません。サインアップする必要があるかもしれません"
            );
            break;
          default:
            window.alert("サインインに失敗しました。もう一度お試しください");
        }
      } else {
        window.confirm("予期せぬエラーが発生しました");
      }
    }
  };

  return (
    <Box className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100">
      <Box className="w-full max-w-3xl p-12 bg-white rounded-xl shadow-2xl">
        <VStack spacing={6} align="stretch">
          <Heading
            as="h2"
            textAlign="center"
            className="text-gray-800 text-2xl my-4 font-semibold"
          >
            フロントエンドコロシアムへようこそ
          </Heading>
          <form onSubmit={handleSignIn} className="my-5">
            <FormControl id="email" isRequired className="mb-5">
              <Flex align="center">
                <label className="text-gray-700 w-1/4 mb-0 text-lg font-bold">
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
              <Flex align="center">
                <label className="text-gray-700 w-1/4 mb-0 text-lg font-bold">
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
              <div className="flex items-center justify-center mt-7">
                <Button
                  type="submit"
                  colorScheme="blue"
                  width="300px"
                  className=" py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition duration-300 transform hover:scale-105"
                >
                  サインインする
                </Button>
              </div>
            </FormControl>
          </form>
          <Text align="center">
            アカウントがない場合は、
            <Link to="/signup" className="text-blue-600">
              サインアップ
            </Link>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default SignIn;
