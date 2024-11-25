import React, { useEffect, useState } from "react";
import { fetchLeaderboard, fetchCategories } from "../api"; // Assuming you have a fetchCategories API

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch leaderboard data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await fetchLeaderboard();
        setLeaderboard(data);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
      }
    };
    fetchData();
  }, []);

  // Fetch categories for buttons
  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const { data } = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategoriesData();
  }, []);

  // Filter leaderboard based on selected category
  const filteredLeaderboard = selectedCategory
    ? leaderboard.filter((result) => result.category === selectedCategory)
    : leaderboard;

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>

      {/* Category buttons */}
      <div className="category-buttons">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(category)}
            style={{
              backgroundColor: selectedCategory === category ? '#0077b6' : '#ddd',
              color: selectedCategory === category ? '#fff' : '#000',
            }}
          >
            {category}
          </button>
        ))}
        <button
          onClick={() => setSelectedCategory(null)}
          style={{
            backgroundColor: !selectedCategory ? '#0077b6' : '#ddd',
            color: !selectedCategory ? '#fff' : '#000',
          }}
        >
          All Categories
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {filteredLeaderboard.map((result, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{result.userName}</td>
              <td>{result.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardPage;
