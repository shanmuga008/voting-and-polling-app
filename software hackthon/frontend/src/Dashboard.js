import React, { useState } from 'react';

function AdminDashboard() {
  const [polls, setPolls] = useState([]);
  const [pollTitle, setPollTitle] = useState('');
  const [pollOptions, setPollOptions] = useState('');
  const [newOption, setNewOption] = useState('');

  const createPoll = () => {
    if (pollTitle && pollOptions) {
      setPolls([
        ...polls,
        {
          title: pollTitle,
          options: pollOptions.split(',').map(option => ({ option, votes: 0 })),
        },
      ]);
      setPollTitle('');
      setPollOptions('');
    } else {
      alert('Please fill out both the title and options');
    }
  };

  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      <div>
        <input
          type="text"
          placeholder="Poll Title"
          value={pollTitle}
          onChange={(e) => setPollTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Poll Options (comma separated)"
          value={pollOptions}
          onChange={(e) => setPollOptions(e.target.value)}
        />
        <button onClick={createPoll}>Create Poll</button>
      </div>
      <div>
        {polls.length > 0 && (
          <div>
            <h3>Created Polls:</h3>
            {polls.map((poll, index) => (
              <div key={index}>
                <h4>{poll.title}</h4>
                {poll.options.map((option, i) => (
                  <p key={i}>{option.option} - {option.votes} votes</p>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
