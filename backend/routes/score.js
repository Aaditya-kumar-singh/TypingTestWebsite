const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Save typing test score
router.post("/save-score", authMiddleware, async (req, res) => {
  try {
    const { wpm, accuracy } = req.body;
    const user = await User.findById(req.user.id);
    user.scores.push({ wpm, accuracy });
    await user.save();
    res.json({ message: "Score saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error saving score" });
  }
});

// Get user scores
router.get("/get-scores", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.scores);
  } catch (error) {
    res.status(500).json({ error: "Error fetching scores" });
  }
});

module.exports = router;
