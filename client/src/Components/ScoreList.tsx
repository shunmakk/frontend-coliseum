import React from "react";

interface LeaderboardEntry {
  name: string;
  totalScore: number;
  averageScore: number;
  isCurrentUser: boolean;
}

interface ScoreListProps {
  title: string;
  leaderboard: LeaderboardEntry[];
  isAverage?: boolean; // 平均スコアのリストかどうかを示すフラグ
}

const ScoreList: React.FC<ScoreListProps> = ({ title, leaderboard, isAverage = false }) => {
  return (
    <div className="border-2 border-violet-300 w-full md:w-1/2 px-8 py-6 rounded relative mt-6">
      <h3 className="absolute left-1/2 transform -translate-x-1/2 -translate-y-10 text-center text-white bg-violet-300 px-4 py-1 w-2/3 rounded-lg font-bold text-sm">
        {title}
      </h3>
      <ol>
        {leaderboard.map((entry, index) => (
          <li key={index} style={entry.isCurrentUser ? { fontWeight: "bold", color: "blue" } : {}}>
            {entry.name}: {isAverage ? entry.averageScore.toFixed(1) : entry.totalScore}点
            {entry.isCurrentUser && " (あなた)"}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ScoreList;
