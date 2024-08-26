import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./Components/Auth";
import SignUp from "./Components/SignUp";
import Start from "./Components/Start";
import Quiz from "./Components/Quiz";
import Complete from "./Components/Complete";
import Profile from "./Components/Profile";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/start" element={<Start />} />
        <Route path="/quiz/:difficulty" element={<Quiz />} />
        <Route path="/complete" element={<Complete />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;
