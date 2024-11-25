import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import AdminPanel from "./components/AdminPanel";
import Quiz from "./components/Quiz";
import UserHome from "./components/UserHome";
import Navbar from "./components/Navbar";
import ResultsPage from "./components/ResultsPage";
import LeaderboardPage from "./components/LeaderboardPage";

const App = () => {
  const [allResults, setAllResults] = useState([]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<UserHome allResults={allResults} setAllResults={setAllResults} />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<ResultsPage allResults={allResults} />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>
    </Router>
  );
};

export default App;
