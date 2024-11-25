const express = require("express");
const { addQuestion, getQuestionsByCategory } = require("../controllers/questionController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", authMiddleware(["admin"]), addQuestion);
router.get("/:category", authMiddleware(["admin", "user"]), getQuestionsByCategory);

module.exports = router;
