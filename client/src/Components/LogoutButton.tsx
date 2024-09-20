import React from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("ログアウトしますか？");
    if (confirmLogout) {
      auth.signOut();
      navigate("/");
      setTimeout(() => {
        window.alert("ログアウトに成功しました");
      }, 500);
    }
    return;
  };
  return (
    <div>
      <button onClick={handleLogout}>ログアウト</button>
    </div>
  );
};

export default LogoutButton;
