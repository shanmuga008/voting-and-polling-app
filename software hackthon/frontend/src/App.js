// src/App.js
import React, { useState } from 'react';
import Login from './Login';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import './App.css';

function App() {
  const [role, setRole] = useState(null); // 'admin' or 'user'
  const [polls, setPolls] = useState([]);

  return (
    <div className="App">
      {!role ? (
        <Login setRole={setRole} />
      ) : role === 'admin' ? (
        <AdminDashboard polls={polls} setPolls={setPolls} />
      ) : (
        <UserDashboard polls={polls} setPolls={setPolls} />
      )}
    </div>
  );
}

export default App;
