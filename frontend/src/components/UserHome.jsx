import React, { useState, useEffect } from "react";
import { fetchCategories, fetchQuestionsByCategory } from "../api";
import { saveResult } from "../api";
import PopupMessage from './PopupMessage';

const UserHome = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const { data } = await fetchCategories();
                setCategories(data);
            } catch (err) {
                console.error("Error fetching categories:", err);
            }
        };
        loadCategories();
    }, []);

    const startQuiz = async (category) => {
        setSelectedCategory(category);
        setIsLoading(true);
        try {
            const { data } = await fetchQuestionsByCategory(category);
            setQuestions(data);
            setCurrentQuestionIndex(0);
            setScore(0);
            setSelectedAnswers({});
        } catch (err) {
            setPopupMessage("Failed to fetch questions");
            setShowPopup(true);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle answer selection
    const handleAnswerChange = (questionIndex, answer) => {
        setSelectedAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionIndex]: answer,
        }));
    };

    // Handle quiz submission and calculate score
    const handleSubmit = async () => {
        let calculatedScore = 0;
        questions.forEach((q, index) => {
            if (selectedAnswers[index] === q.correctAnswer) {
                calculatedScore++;
            }
        });
        setScore(calculatedScore);

        const userName = localStorage.getItem("name");

        await saveResult({
            userName: userName,
            category: selectedCategory,
            score: calculatedScore,
            totalQuestions: questions.length,
        });

        setPopupMessage(`Quiz completed! Your score: ${calculatedScore}/${questions.length}`);
        setShowPopup(true);
        setTimeout(() => {
            setCurrentQuestionIndex(0);
            setScore(0);
            setShowPopup(false);
            setSelectedAnswers({});
            setSelectedCategory(null);
        }, 5000);
    };

    const renderQuiz = () => {
        if (questions.length === 0) return null;

        const currentQuestion = questions[currentQuestionIndex];

        const isLastQuestion = currentQuestionIndex === questions.length - 1;

        const allAnswersSelected = Object.keys(selectedAnswers).length === questions.length;

        return (
            <div className="quiz-container">
                <h2>Quiz: {selectedCategory}</h2>
                <div>
                    <p>{currentQuestionIndex + 1}.{currentQuestion.question}</p>
                    {currentQuestion.options.map((option, index) => (
                        <div
                            key={index}
                            className="options"
                            onClick={() => handleAnswerChange(currentQuestionIndex, option)}
                            style={{
                                cursor: "pointer",
                                backgroundColor: selectedAnswers[currentQuestionIndex] === option ? "#0077b6" : "#f0f0f0",
                                padding: "10px",
                                margin: "5px",
                                borderRadius: "5px"
                            }}
                        >
                            <label>{option}</label>
                        </div>
                    ))}
                    <div className="buttons">
                        <button
                            onClick={() => {
                                if (currentQuestionIndex > 0) {
                                    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
                                }
                            }}
                            disabled={currentQuestionIndex === 0}
                        >
                            Previous
                        </button>
                        <button
                            onClick={() => {
                                if (isLastQuestion) {
                                    handleSubmit();
                                } else {
                                    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
                                }
                            }}
                            style={{
                                backgroundColor: !allAnswersSelected && isLastQuestion ? "gray" : isLastQuestion ? "#ff4d4d" : "#0077b6",
                            }}
                            disabled={!allAnswersSelected && isLastQuestion}
                        >
                            {isLastQuestion ? "Submit" : "Next"}
                        </button>
                        {showPopup && (
                            <PopupMessage
                                message={popupMessage}
                                onClose={() => setShowPopup(false)}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    };

    // Show results after quiz completion
    const renderResults = () => (
        <div>
            <h2>Quiz Results</h2>
            <p>Your score: {score} / {questions.length}</p>
            <button onClick={() => setSelectedCategory(null)}>Start Over</button>
        </div>
    );

    // Loading state
    if (isLoading) {
        return <div>Loading questions...</div>;
    }

    return (
        <div>
            {!selectedCategory ? (
                <div>
                    <h2>Select a Category</h2>
                    <div className="cardContainer">
                        {categories.map((category, index) => (
                            <div
                                key={index}
                                className="card"
                                onClick={() => startQuiz(category)}
                            >
                                <h3>{category}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    {currentQuestionIndex < questions.length ? renderQuiz() : renderResults()}
                </div>
            )}
        </div>
    );
};

export default UserHome;
