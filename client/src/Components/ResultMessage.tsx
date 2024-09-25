import React from "react";

interface ResultProps {
  score?: number;
  difficulty?: string;
}

const ResultMessage: React.FC<ResultProps> = ({ score = 0, difficulty }) => {
  const getMessage = () => {
    switch (difficulty) {
      case "easy":
        if (score === 1) return "フロントエンドの基礎がほとんど理解できていないです";
        if (score === 2) return "これじゃあフロントエンドエンジニアにはなれませんよ？";
        if (score === 3) return "良い成績です。基礎はおおむね理解できています。";
        if (score === 4) return "あともう一歩です！引き続き勉強頑張ってください！";
        if (score === 5) return "完璧です！中級にチャレンジしましょう！";
        return "あなたはフロントエンドに関する知識が全くありません。基礎から勉強してください";

      case "medium":
        if (score === 1)
          return "フロントエンドのフレームワーク、TypeScriptに対する理解が足りないです";
        if (score === 2) return "参考書で勉強してみては？";
        if (score === 3) return "良い成績です。おおむね理解できています。";
        if (score === 4) return "あともう一歩です！引き続き勉強頑張ってください！";
        if (score === 5) return "完璧です！上級にチャレンジしましょう！";
        return "基礎からじっくり学び直す必要がありそうです。諦めずに頑張りましょう！";

      case "hard":
        if (score === 1)
          return "web系の自社開発企業でフロントエンドエンジニアやるのは厳しいですよ？";
        if (score === 2) return "まぐれかな？";
        if (score === 3) return "良い成績です。基礎はおおむね理解できています。";
        if (score === 4) return "あともう一歩です！引き続き勉強頑張ってください！";
        if (score === 5) return "おめでとうございます！あなたはこのサイトは必要ないみたいです！";
        return "基礎からじっくり学び直す必要がありそうです。諦めずに頑張りましょう！";

      default:
        return "予期せぬ難易度です。スコアの計算ができませんでした。";
    }
  };
  return <p>{getMessage()}</p>;
};

export default ResultMessage;
