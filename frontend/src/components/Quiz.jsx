import React, { useEffect, useState } from "react";
import { fetchQuestionsByCategory } from "../api";
import PopupMessage from './PopupMessage'; // Import the PopupMessage component

const Quiz = ({ selectedCategory }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const { data } = await fetchQuestionsByCategory(selectedCategory);
        setQuestions(data);
      } catch (err) {
        setPopupMessage("Failed to fetch questions");
        setShowPopup(true);
      }
    };
    if (selectedCategory) {
      loadQuestions();
    }
  }, [selectedCategory]);

  const handleSubmit = () => {
    if (questions[currentQuestion].correctAnswer === selectedAnswer) {
      setScore(score + 1);
    }
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    } else {
      setPopupMessage(`Quiz completed! Your score: ${score + 1}/${questions.length}`);
      setShowPopup(true);
      setTimeout(() => {
        setCurrentQuestion(0);
        setScore(0);
        setShowPopup(false);
      }, 2000);
    }
  };

  if (questions.length === 0) return <p>Loading questions...</p>;

  return (
    <div>
      <h2>Quiz</h2>
      <p>{questions[currentQuestion].question}</p>
      {questions[currentQuestion].options.map((option, index) => (
        <div key={index}>
          <input
            type="radio"
            name="answer"
            value={option}
            checked={selectedAnswer === option}
            onChange={(e) => setSelectedAnswer(e.target.value)}
          />
          <label>{option}</label>
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
      {showPopup && (
        <PopupMessage
          message={popupMessage}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default Quiz;
