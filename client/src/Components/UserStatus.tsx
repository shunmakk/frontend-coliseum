import React from "react";

interface LeaderboardEntry {
  name: string;
  totalScore: number;
  averageScore: number;
  isCurrentUser: boolean;
}

interface UserStatsProps {
  userData: LeaderboardEntry | null;
  userTotalRank: number | null;
  userAverageRank: number | null;
}

const UserStatus: React.FC<UserStatsProps> = ({
  userData,
  userTotalRank,
  userAverageRank,
}) => {
  if (!userData) return null;

  return (
    <div>
      <p>
        あなたの総スコア: {userData.totalScore}点 (ランク: {userTotalRank}位)
      </p>
      <p>
        あなたの平均スコア: {userData.averageScore.toFixed(1)}点 (ランク:{" "}
        {userAverageRank}位)
      </p>
    </div>
  );
};

export default UserStatus;
