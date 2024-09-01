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
}

const ScoreList: React.FC<ScoreListProps> = ({ title, leaderboard }) => {
  return (
    <div>
      <h3>{title}</h3>
      <ol>
        {leaderboard.map((entry, index) => (
          <li
            key={index}
            style={
              entry.isCurrentUser ? { fontWeight: "bold", color: "blue" } : {}
            }
          >
            {entry.name}: {entry.totalScore}点
            {entry.isCurrentUser && " (あなた)"}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ScoreList;
