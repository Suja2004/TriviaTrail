const Question = require("../models/Question");

const addQuestion = async (req, res) => {
  try {
    const { question, options, correctAnswer, category } = req.body;
    const newQuestion = new Question({ question, options, correctAnswer, category });
    await newQuestion.save();
    res.status(201).json({ message: "Question added successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getQuestionsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const questions = await Question.find({ category });
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addQuestion, getQuestionsByCategory };
