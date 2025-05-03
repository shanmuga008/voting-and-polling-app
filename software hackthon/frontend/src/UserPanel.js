import React, { useState } from "react";
import "./UserPanel.css";

function UserPanel() {
  const [selectedOption, setSelectedOption] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (confirmation.toLowerCase() === "vote" && selectedOption) {
      setSubmitted(true);
      // You can send data to backend here
    } else {
      alert("Please type 'vote' to confirm your submission.");
    }
  };

  if (submitted) {
    return (
      <div className="user-container">
        <div className="user-card">
          <h2>Thank you for your response!</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="user-container">
      <div className="user-card">
        <h2>Vote Your Opinion</h2>
        <p className="question">What is your favorite programming language?</p>

        <div className="options">
          <label>
            <input
              type="radio"
              name="vote"
              value="JavaScript"
              onChange={(e) => setSelectedOption(e.target.value)}
            />
            JavaScript
          </label>
          <label>
            <input
              type="radio"
              name="vote"
              value="Python"
              onChange={(e) => setSelectedOption(e.target.value)}
            />
            Python
          </label>
          <label>
            <input
              type="radio"
              name="vote"
              value="C++"
              onChange={(e) => setSelectedOption(e.target.value)}
            />
            C++
          </label>
        </div>

        <input
          type="text"
          placeholder="Type 'vote' to confirm"
          className="confirm-input"
          value={confirmation}
          onChange={(e) => setConfirmation(e.target.value)}
        />

        <button className="submit-btn" onClick={handleSubmit}>
          Submit Vote
        </button>
      </div>
    </div>
  );
}

export default UserPanel;
