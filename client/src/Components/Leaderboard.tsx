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
import { Link } from "react-router-dom";

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

  if (!user)
    return (
      <div>
        <p>ローディング...</p>
        <Link to="/start">ホーム画面に戻る</Link>
      </div>
    );

  return (
    <div>
      <h2>ランキング機能</h2>
      {userData && (
        <div>
          <p>
            あなたの総スコア: {userData.totalScore}点 (ランク: {userTotalRank}
            位)
          </p>
          <p>
            あなたの平均スコア: {userData.averageScore.toFixed(1)}点 (ランク:{" "}
            {userAverageRank}位)
          </p>
        </div>
      )}
      <h3>総スコアトップ10</h3>
      <ol>
        {totalScoreLeaderboard.map((entry, index) => (
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
      <h3>平均スコアトップ10</h3>
      <ol>
        {averageScoreLeaderboard.map((entry, index) => (
          <li
            key={index}
            style={
              entry.isCurrentUser ? { fontWeight: "bold", color: "blue" } : {}
            }
          >
            {entry.name}: {entry.averageScore.toFixed(1)}点
            {entry.isCurrentUser && " (あなた)"}
          </li>
        ))}
      </ol>
      {userTotalRank && userTotalRank > 10 && (
        <p>
          ※ あなたの総スコアは現在{userTotalRank}
          位です。頑張ってトップ10入りを目指しましょう！
        </p>
      )}
      {userAverageRank && userAverageRank > 10 && (
        <p>
          ※ あなたの平均スコアは現在{userAverageRank}
          位です。頑張ってトップ10入りを目指しましょう！
        </p>
      )}
    </div>
  );
};

export default Leaderboard;
