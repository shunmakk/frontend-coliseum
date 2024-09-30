import React from "react";
import { Box } from "@chakra-ui/react";
import { FaUser, FaGamepad } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FcRatings } from "react-icons/fc";
import { SiSecurityscorecard } from "react-icons/si";
import LoadingOrError from "../../Components/LoadingOrError";
import Footer from "../../Components/Footer";
import { useProfile } from "../../Hooks/UseProfile";
import { ProfileData } from "../../lib/types";

const profileItems = [
  { icon: FaUser, label: "ユーザー名", key: "name" },
  { icon: IoMdMail, label: "メールアドレス", key: "email" },
  { icon: FaGamepad, label: "総プレイ回数", key: "totalGames", suffix: "ゲーム" },
  { icon: FcRatings, label: "総スコア", key: "totalScore" },
  {
    icon: SiSecurityscorecard,
    label: "平均スコア",
    key: "averageScore",
    getValue: (profile: ProfileData) =>
      profile.totalGames > 0 ? (profile.totalScore / profile.totalGames).toFixed(2) : "N/A",
  },
];

const ProfileItem: React.FC<{
  icon: React.ElementType;
  label: string;
  value: string | number;
}> = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-2 mb-2">
    <Icon className="text-gray-600" />
    <span className="font-bold">{label}:</span>
    <span>{value}</span>
  </div>
);

const Profile: React.FC = () => {
  const { profile, isLoading, error } = useProfile();

  if (isLoading || error)
    return (
      <>
        <LoadingOrError />
        <Footer />
      </>
    );

  if (!profile) return null;

  return (
    <Box className="bg-white p-8 rounded-md max-w-xl mx-auto shadow-md">
      <h2 className="font-bold text-2xl mb-4">プロフィール</h2>
      {profileItems.map((item) => (
        <ProfileItem
          key={item.key}
          icon={item.icon}
          label={item.label}
          value={
            item.getValue
              ? item.getValue(profile)
              : `${profile[item.key as keyof ProfileData]}${item.suffix || ""}`
          }
        />
      ))}
      <Footer />
    </Box>
  );
};

export default Profile;
