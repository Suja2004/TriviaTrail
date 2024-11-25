import React, { useState, useEffect } from "react";
import { fetchCategories } from "../api";

const AdminHome = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      const { data } = await fetchCategories();
      setCategories(data);
    };
    loadCategories();
  }, []);

  return (
    <div>
      <h2>Admin Home</h2>
      <div className="cardContainer">
        {categories.map((category, index) => (
          <div
            key={index}
            className="card"
            onClick={() => onSelectCategory(category)}
          >
            <h3>{category}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
