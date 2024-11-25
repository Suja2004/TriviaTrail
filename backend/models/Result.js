const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  category: { type: String, required: true },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Result", resultSchema);
