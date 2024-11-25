const express = require("express");
const router = express.Router();
const Result = require("../models/Result");

// Add a result
router.post("/add", async (req, res) => {
  try {
    const { userName, category, score, totalQuestions } = req.body;
    const newResult = new Result({ userName, category, score, totalQuestions });
    await newResult.save();
    res.status(201).json({ message: "Result saved successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error saving result" });
  }
});

// Get all results
router.get("/", async (req, res) => {
  try {
    const userName = req.body.userName;
    const results = await Result.find();
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: "Error fetching results" });
  }
});

// Get leaderboard
router.get("/leaderboard", async (req, res) => {
  try {
    const leaderboard = await Result.find()
      .sort({ score: -1 })
      .limit(10);
    res.status(200).json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: "Error fetching leaderboard" });
  }
});

module.exports = router;
