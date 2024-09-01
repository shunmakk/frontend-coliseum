import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../utils/AuthContext";
import LoadingOrError from "./LoadingOrError";
import ScoreList from "./ScoreList";
import UserStats from "./UserStatus";

interface LeaderboardEntry {
  name: string;
  totalScore: number;
  averageScore: number;
  isCurrentUser: boolean;
}

const Leaderboard: React.FC = () => {
  const [totalScoreLeaderboard, setTotalScoreLeaderboard] = useState<
    LeaderboardEntry[]
  >([]);
  const [averageScoreLeaderboard, setAverageScoreLeaderboard] = useState<
    LeaderboardEntry[]
  >([]);
  const [userTotalRank, setUserTotalRank] = useState<number | null>(null);
  const [userAverageRank, setUserAverageRank] = useState<number | null>(null);
  const [userData, setUserData] = useState<LeaderboardEntry | null>(null);
  const { user } = useAuth();

  //firestoreからデータ取得
  useEffect(() => {
    const fetchLeaderboard = async () => {
      if (!user) return;

      try {
        const usersRef = collection(db, "users");

        // 合計スコアを取得 *上限は上位10位
        const totalScoreQuery = query(
          usersRef,
          orderBy("totalScore", "desc"),
          limit(10)
        );

        const totalScoreSnapshot = await getDocs(totalScoreQuery);
        const totalScoreData = totalScoreSnapshot.docs.map((doc) => ({
          name: doc.data().name,
          totalScore: doc.data().totalScore || 0,
          averageScore: doc.data().averageScore || 0,
          isCurrentUser: doc.id === user.uid,
        }));
        setTotalScoreLeaderboard(totalScoreData);

        // 平均スコアを取得
        const averageScoreQuery = query(
          usersRef,
          orderBy("averageScore", "desc"),
          limit(10)
        );
        const averageScoreSnapshot = await getDocs(averageScoreQuery);
        const averageScoreData = averageScoreSnapshot.docs.map((doc) => ({
          name: doc.data().name,
          totalScore: doc.data().totalScore || 0,
          averageScore: doc.data().averageScore || 0,
          isCurrentUser: doc.id === user.uid,
        }));
        setAverageScoreLeaderboard(averageScoreData);

        // 現在のuserのデータを取得する
        const userDoc = await getDoc(doc(usersRef, user.uid));
        if (userDoc.exists()) {
          const userdata = userDoc.data();
          setUserData({
            name: userdata.name,
            totalScore: userdata.totalScore || 0,
            averageScore: userdata.averageScore || 0,
            isCurrentUser: true,
          });

          //ユーザーたちのの合計スコアを計算
          const totalRankQuery = query(usersRef, orderBy("totalScore", "desc"));
          const totalRankSnapshot = await getDocs(totalRankQuery);
          const totalRank =
            totalRankSnapshot.docs.findIndex((doc) => doc.id === user.uid) + 1;
          setUserTotalRank(totalRank);

          // ユーザーたちのの平均スコアを計算
          const averageRankQuery = query(
            usersRef,
            orderBy("averageScore", "desc")
          );
          const averageRankSnapshot = await getDocs(averageRankQuery);
          const averageRank =
            averageRankSnapshot.docs.findIndex((doc) => doc.id === user.uid) +
            1;
          setUserAverageRank(averageRank);
        }
      } catch (error) {
        console.error("エラー！ランキング機能の取得に失敗しました", error);
      }
    };

    fetchLeaderboard();
  }, [user]);

  if (!user) <LoadingOrError />;

  return (
    <div>
      <h2>ランキング機能</h2>
      <UserStats
        userData={userData}
        userTotalRank={userTotalRank}
        userAverageRank={userAverageRank}
      />
      <ScoreList title="総スコアトップ10" leaderboard={totalScoreLeaderboard} />
      <ScoreList
        title="平均スコアトップ10"
        leaderboard={averageScoreLeaderboard}
        isAverage={true}
      />
    </div>
  );
};

export default Leaderboard;
