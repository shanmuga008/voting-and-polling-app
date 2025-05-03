// src/UserDashboard.js
import React, { useState } from 'react';

const UserDashboard = ({ polls, setPolls }) => {
  const [confirmationTexts, setConfirmationTexts] = useState({});
  const [votedPolls, setVotedPolls] = useState([]);

  const handleVote = (pollId, option) => {
    if (confirmationTexts[pollId]?.toLowerCase() !== 'vote') {
      alert('Please type "vote" to confirm your submission.');
      return;
    }

    if (votedPolls.includes(pollId)) {
      alert('You have already voted in this poll.');
      return;
    }

    const updatedPolls = polls.map(poll => {
      if (poll.id === pollId) {
        return {
          ...poll,
          votes: {
            ...poll.votes,
            [option]: poll.votes[option] + 1
          }
        };
      }
      return poll;
    });

    setPolls(updatedPolls);
    setVotedPolls([...votedPolls, pollId]);
    setConfirmationTexts({ ...confirmationTexts, [pollId]: '' });
    alert('Thank you for voting!');
  };

  const handleInputChange = (pollId, value) => {
    setConfirmationTexts(prev => ({ ...prev, [pollId]: value }));
  };

  const handleDelete = (pollId) => {
    if (window.confirm("Are you sure you want to delete this poll?")) {
      const updatedPolls = polls.filter(poll => poll.id !== pollId);
      setPolls(updatedPolls);
    }
  };

  const handleEdit = (pollId) => {
    const newQuestion = prompt("Edit the poll question:");
    if (!newQuestion) return;

    const updatedPolls = polls.map(poll => {
      if (poll.id === pollId) {
        return { ...poll, question: newQuestion };
      }
      return poll;
    });

    setPolls(updatedPolls);
  };

  return (
    <div className="user-panel">
      <h2>User Dashboard</h2>
      {polls.length === 0 ? (
        <p>No polls available right now.</p>
      ) : (
        polls.map(poll => (
          <div className="poll" key={poll.id}>
            <h4>{poll.question}</h4>
            <div className="poll-options">
              {poll.options.map(option => (
                <button
                  key={option}
                  onClick={() => handleVote(poll.id, option)}
                  disabled={votedPolls.includes(poll.id)}
                >
                  {option}
                </button>
              ))}
            </div>
            {!votedPolls.includes(poll.id) && (
              <input
                type="text"
                placeholder="Type 'vote' to confirm"
                value={confirmationTexts[poll.id] || ''}
                onChange={(e) => handleInputChange(poll.id, e.target.value)}
              />
            )}
            {votedPolls.includes(poll.id) && <p style={{ color: 'green' }}>You have voted.</p>}
            <div style={{ marginTop: '10px' }}>
              <button onClick={() => handleEdit(poll.id)}>Edit</button>
              <button onClick={() => handleDelete(poll.id)} style={{ marginLeft: '10px', color: 'red' }}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserDashboard;
