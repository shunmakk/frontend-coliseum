import { FaCode, FaReact, FaRocket } from "react-icons/fa";
import { Difficulty } from "./types";

export const DifficultyOptions: Array<{
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
