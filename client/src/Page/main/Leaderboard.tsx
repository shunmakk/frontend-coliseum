import React, { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../Context/AuthContext";
import LoadingOrError from "../../Components/LoadingOrError";
import ScoreList from "../../Components/ScoreList";
import UserStats from "../../Components/UserStatus";
import Footer from "../../Components/Footer";
import { Box } from "@chakra-ui/react";

interface LeaderboardEntry {
  name: string;
  totalScore: number;
  averageScore: number;
  isCurrentUser: boolean;
}

interface LeaderboardData {
  totalScoreLeaderboard: LeaderboardEntry[];
  averageScoreLeaderboard: LeaderboardEntry[];
  userTotalRank: number | null;
  userAverageRank: number | null;
  userData: LeaderboardEntry | null;
}

const Leaderboard: React.FC = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        const usersRef = collection(db, "users");

        const [
          totalScoreSnapshot,
          averageScoreSnapshot,
          userDoc,
          totalRankSnapshot,
          averageRankSnapshot,
        ] = await Promise.all([
          getDocs(query(usersRef, orderBy("totalScore", "desc"), limit(10))),
          getDocs(query(usersRef, orderBy("averageScore", "desc"), limit(10))),
          getDoc(doc(usersRef, user.uid)),
          getDocs(query(usersRef, orderBy("totalScore", "desc"))),
          getDocs(query(usersRef, orderBy("averageScore", "desc"))),
        ]);

        const totalScoreData = totalScoreSnapshot.docs.map((doc) => ({
          name: doc.data().name,
          totalScore: doc.data().totalScore || 0,
          averageScore: doc.data().averageScore || 0,
          isCurrentUser: doc.id === user.uid,
        }));

        const averageScoreData = averageScoreSnapshot.docs.map((doc) => ({
          name: doc.data().name,
          totalScore: doc.data().totalScore || 0,
          averageScore: doc.data().averageScore || 0,
          isCurrentUser: doc.id === user.uid,
        }));

        let userData = null;
        let userTotalRank = null;
        let userAverageRank = null;

        if (userDoc.exists()) {
          const userdata = userDoc.data();
          userData = {
            name: userdata.name,
            totalScore: userdata.totalScore || 0,
            averageScore: userdata.averageScore || 0,
            isCurrentUser: true,
          };

          userTotalRank = totalRankSnapshot.docs.findIndex((doc) => doc.id === user.uid) + 1;
          userAverageRank = averageRankSnapshot.docs.findIndex((doc) => doc.id === user.uid) + 1;
        }

        setLeaderboardData({
          totalScoreLeaderboard: totalScoreData,
          averageScoreLeaderboard: averageScoreData,
          userTotalRank,
          userAverageRank,
          userData,
        });
      } catch (error) {
        console.error("エラー！ランキング機能の取得に失敗しました", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, [user]);

  if (!user || isLoading) {
    return (
      <>
        <LoadingOrError />
        <Footer />
      </>
    );
  }

  if (!leaderboardData) {
    return <div>データの取得に失敗しました。</div>;
  }

  return (
    <Box className="bg-white p-12  w-full rounded-md max-w-2xl mx-auto shadow-md border">
      <h2 className="text-center font-bold text-3xl mb-8">ランキング</h2>
      <Box className="p-2 border-2 border-violet-300 mb-6 relative rounded-md">
        <h3 className="absolute  text-white bg-violet-300  md:bottom-16 bottom-28 font-bold text-xs border-2 border-violet-300 left-0 p-1 rounded">
          あなたの指標
        </h3>
        <UserStats
          userData={leaderboardData.userData}
          userTotalRank={leaderboardData.userTotalRank}
          userAverageRank={leaderboardData.userAverageRank}
        />
      </Box>
      <div className="flex flex-col md:flex-row justify-between  gap-7 ">
        <ScoreList title="総スコアトップ10" leaderboard={leaderboardData.totalScoreLeaderboard} />
        <ScoreList
          title="平均スコアトップ10"
          leaderboard={leaderboardData.averageScoreLeaderboard}
          isAverage={true}
        />
      </div>
      <Footer />
    </Box>
  );
};

export default Leaderboard;
