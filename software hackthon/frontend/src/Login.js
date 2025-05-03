// src/Login.js
import React, { useState } from 'react';

const Login = ({ setRole }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const handleLogin = () => {
    if (!selectedRole) {
      alert('Please select a role');
      return;
    }
    if (username && password) {
      setRole(selectedRole);
    } else {
      alert('Enter valid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2>Login to Voting App</h2>
      <input
        type="text"
        placeholder="Username"
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />
      <select onChange={e => setSelectedRole(e.target.value)} defaultValue="">
        <option value="" disabled>Select Role</option>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
