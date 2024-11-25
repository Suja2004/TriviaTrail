import React, { useState } from "react";
import AdminHome from "./AdminHome";
import { addQuestion } from "../api";

const AdminPanel = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [form, setForm] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });

  const handleSubmit = async () => {
    try {
      await addQuestion({ ...form, category: selectedCategory });
      alert("Question added successfully");
      setForm({ question: "", options: ["", "", "", ""], correctAnswer: "" });
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add question");
    }
  };

  if (!selectedCategory) {
    return <AdminHome onSelectCategory={setSelectedCategory} />;
  }

  return (
    <div className="add-question-container">
      <h2 className="add-question-title">Add Questions for {selectedCategory}</h2>
      <input
        className="add-question-input"
        type="text"
        placeholder="Question"
        value={form.question}
        onChange={(e) => setForm({ ...form, question: e.target.value })}
      />
      {form.options.map((option, index) => (
        <input
          key={index}
          className="add-question-option"
          type="text"
          placeholder={`Option ${index + 1}`}
          value={option}
          onChange={(e) =>
            setForm({
              ...form,
              options: form.options.map((opt, i) =>
                i === index ? e.target.value : opt
              ),
            })
          }
        />
      ))}
      <input
        className="add-question-input correct"
        type="text"
        placeholder="Correct Answer"
        value={form.correctAnswer}
        onChange={(e) => setForm({ ...form, correctAnswer: e.target.value })}
      />
      <button className="add-question-button" onClick={handleSubmit}>
        Add Question
      </button>
    </div>
  );
};

export default AdminPanel;
