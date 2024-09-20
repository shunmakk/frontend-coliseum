import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import LogoutButton from "../../Components/LogoutButton";

interface UserProfile {
  name: string;
  email: string;
  totalGames: number;
  totalScore: number;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
        }
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h2>Profile</h2>
      <p>ユーザー名: {profile.name}</p>
      <p>メールアドレス: {profile.email}</p>
      <p>総プレイ回数: {profile.totalGames}</p>
      <p>総スコア: {profile.totalScore}</p>
      <p>
        平均スコア:{" "}
        {profile.totalGames > 0
          ? (profile.totalScore / profile.totalGames).toFixed(2)
          : "N/A"}
      </p>
      <LogoutButton />
    </div>
  );
};

export default Profile;
