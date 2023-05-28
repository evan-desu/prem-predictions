import React, { useState } from 'react';
import '../styles/Login.css';

export default function Login({ onLogin, onClose }) {
  // STATE
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // HANDLERS
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    fetch('https://prem-predictions-aavx.onrender.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        onClose();
        onLogin(username);
      })
      .catch((error) => {
        console.log('Error logging in:', error);
      });
  };
  
  const handleReset = () => {
    setUsername('');
    setPassword('');
    onClose();
  }

  return (
    <div className="login--container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="username--container">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="password--container">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button className="login--button" type="submit">
          Submit
        </button>
        <button className="login--button" type="reset" onClick={handleReset}>
          Close
        </button>
      </form>
    </div>
);
}