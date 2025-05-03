const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let poll = {
  question: "What is your favorite programming language?",
  options: ["Python", "JavaScript", "C++", "Java"],
  votes: [0, 0, 0, 0]
};

// User submits a vote
app.post("/vote", (req, res) => {
  const { optionIndex, confirmation } = req.body;
  if (confirmation.toLowerCase() !== "vote") {
    return res.status(400).json({ message: "Confirmation failed" });
  }
  poll.votes[optionIndex]++;
  res.json({ message: "Vote counted" });
});

// Admin gets the results
app.get("/results", (req, res) => {
  res.json(poll);
});

// Admin creates a new poll
app.post("/create", (req, res) => {
  const { question, options } = req.body;
  poll = {
    question,
    options,
    votes: Array(options.length).fill(0)
  };
  res.json({ message: "Poll created" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
