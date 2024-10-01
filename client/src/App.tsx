import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./Page/auth/SignIn";
import { SignUp } from "./Page/auth/SignUp";
import Start from "./Page/main/Start";
import Quiz from "./Page/main/Quiz";
import Complete from "./Page/main/Complete";
import Profile from "./Page/main/Profile";
import { AuthProvider } from "./Context/AuthContext";
import ProtectedRoute from "./lib/ProtectedRoute";
import Leaderboard from "./Page/main/Leaderboard";
import NotFound from "./Page/404/NotFound";
import { Box } from "@chakra-ui/react";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Box className="min-h-screen bg-gradient-to-br flex  items-center justify-center from-blue-100 via-purple-100 to-pink-100 py-10 px-4 pb-20 relative">
        <Router>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
            <Route
              path="/start"
              element={
                <ProtectedRoute>
                  <Start />
                </ProtectedRoute>
              }
            />
            <Route
              path="/quiz/:difficulty"
              element={
                <ProtectedRoute>
                  <Quiz />
                </ProtectedRoute>
              }
            />
            <Route
              path="/complete"
              element={
                <ProtectedRoute>
                  <Complete />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <ProtectedRoute>
                  <Leaderboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </Box>
    </AuthProvider>
  );
};

export default App;
