import React, { useEffect, useState } from "react";
import { fetchResults, fetchCategories } from "../api";

const ResultsPage = () => {
  const [results, setResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10; // Limit per page

  useEffect(() => {
    const userName = localStorage.getItem("name");

    // Fetch user-specific results
    const fetchUserResults = async () => {
      try {
        const { data } = await fetchResults(userName);
        setResults(data);
      } catch (err) {
        console.error("Error fetching results:", err);
      }
    };

    // Fetch categories
    const fetchCategoriesData = async () => {
      try {
        const { data } = await fetchCategories();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchUserResults();
    fetchCategoriesData();
  }, []);

  // Filter results based on selected category
  const filteredResults = selectedCategory
    ? results.filter((result) => result.category === selectedCategory)
    : results;

  // Pagination: Get current page results
  const startIndex = (currentPage - 1) * resultsPerPage;
  const currentResults = filteredResults.slice(startIndex, startIndex + resultsPerPage);

  // Check if more pages exist
  const hasNextPage = startIndex + resultsPerPage < filteredResults.length;
  const hasPreviousPage = currentPage > 1;

  return (
    <div className="results">
      <h2>All Quiz Results</h2>

      {/* Category Buttons */}
      <div className="category-buttons">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1); // Reset to first page on category change
            }}
            style={{
              backgroundColor: selectedCategory === category ? "#0077b6" : "#ddd",
              color: selectedCategory === category ? "#fff" : "#000",
            }}
          >
            {category}
          </button>
        ))}
        <button
          onClick={() => {
            setSelectedCategory(null);
            setCurrentPage(1); // Reset to first page when "All Categories" is selected
          }}
          style={{
            backgroundColor: !selectedCategory ? "#0077b6" : "#ddd",
            color: !selectedCategory ? "#fff" : "#000",
          }}
        >
          All Categories
        </button>
      </div>

      {/* Results Table */}
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Category</th>
            <th>Score</th>
            <th>Total Questions</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {currentResults.map((result, index) => (
            <tr key={index}>
              <td>{result.userName}</td>
              <td>{result.category}</td>
              <td>{result.score}</td>
              <td>{result.totalQuestions}</td>
              <td>{new Date(result.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={!hasPreviousPage}
          style={{
            backgroundColor: hasPreviousPage ? "#0077b6" : "#ddd",
            color: hasPreviousPage ? "#fff" : "#000",
            cursor: hasPreviousPage ? "pointer" : "not-allowed",
            padding: "10px 20px",
            marginTop: "20px",
            marginRight: "10px",
          }}
        >
          Previous Page
        </button>

        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={!hasNextPage}
          style={{
            backgroundColor: hasNextPage ? "#0077b6" : "#ddd",
            color: hasNextPage ? "#fff" : "#000",
            cursor: hasNextPage ? "pointer" : "not-allowed",
            padding: "10px 20px",
            marginTop: "20px",
          }}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;
