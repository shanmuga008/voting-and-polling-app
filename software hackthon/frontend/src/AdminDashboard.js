import React, { useState } from 'react';

const AdminDashboard = ({ polls, setPolls }) => {
  const [newPoll, setNewPoll] = useState({ question: '', options: [''], votes: {} });
  const [editPollId, setEditPollId] = useState(null);
  const [editPollQuestion, setEditPollQuestion] = useState('');

  const handleCreatePoll = () => {
    if (newPoll.question.trim() === '') {
      alert('Please enter a valid question');
      return;
    }

    const newPollObj = {
      ...newPoll,
      id: Date.now(),
      options: newPoll.options.filter(option => option.trim() !== ''),
      votes: newPoll.options.reduce((acc, option) => ({ ...acc, [option]: 0 }), {}),
    };

    setPolls([...polls, newPollObj]);
    setNewPoll({ question: '', options: [''], votes: {} });
  };

  const handleAddOption = () => {
    setNewPoll(prev => ({ ...prev, options: [...prev.options, ''] }));
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...newPoll.options];
    updatedOptions[index] = value;
    setNewPoll(prev => ({ ...prev, options: updatedOptions }));
  };

  const handleDeletePoll = (pollId) => {
    if (window.confirm("Are you sure you want to delete this poll?")) {
      const updatedPolls = polls.filter(poll => poll.id !== pollId);
      setPolls(updatedPolls);
    }
  };

  const handleEditPoll = (pollId) => {
    const pollToEdit = polls.find(poll => poll.id === pollId);
    setEditPollId(pollId);
    setEditPollQuestion(pollToEdit.question);
  };

  const handleSaveEdit = () => {
    const updatedPolls = polls.map(poll => {
      if (poll.id === editPollId) {
        return { ...poll, question: editPollQuestion };
      }
      return poll;
    });

    setPolls(updatedPolls);
    setEditPollId(null);
    setEditPollQuestion('');
  };

  const handleCancelEdit = () => {
    setEditPollId(null);
    setEditPollQuestion('');
  };

  return (
    <div className="admin-panel">
      <h2>Admin Dashboard</h2>
      <h3>Create a New Poll</h3>
      <div>
        <input
          type="text"
          placeholder="Poll Question"
          value={newPoll.question}
          onChange={(e) => setNewPoll({ ...newPoll, question: e.target.value })}
        />
        <div>
          {newPoll.options.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
        <button onClick={handleAddOption}>Add Option</button>
        <button onClick={handleCreatePoll}>Create Poll</button>
      </div>

      <h3>Existing Polls</h3>
      {polls.length === 0 ? (
        <p>No polls available right now.</p>
      ) : (
        polls.map(poll => (
          <div key={poll.id} className="poll">
            {editPollId === poll.id ? (
              <div>
                <input
                  type="text"
                  value={editPollQuestion}
                  onChange={(e) => setEditPollQuestion(e.target.value)}
                />
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              <div>
                <h4>{poll.question}</h4>
                <button onClick={() => handleEditPoll(poll.id)}>Edit</button>
                <button onClick={() => handleDeletePoll(poll.id)} style={{ marginLeft: '10px', color: 'red' }}>Delete</button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default AdminDashboard;
