import React from "react";
import { Link } from "react-router-dom";
import { Flex, Button } from "@chakra-ui/react";
import { FaUser, FaTrophy } from "react-icons/fa";
import LogoutButton from "./LogoutButton";
import { IoMdHome } from "react-icons/io";

const Footer: React.FC = () => {
  return (
    <>
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
        // 768px以下の画面は非表示に
        css={{
          "@media screen and (max-width: 767px)": {
            display: "none",
          },
        }}
      >
        <Link to="/start">
          <Button leftIcon={<IoMdHome />} colorScheme="teal" variant="ghost">
            ホーム
          </Button>
        </Link>
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
    </>
  );
};

export default Footer;
