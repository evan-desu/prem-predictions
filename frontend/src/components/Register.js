import React, { useState } from 'react';
import '../styles/Register.css';

export default function Register({ onClose }) {
  // STATE
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // HANDLERS
  const handleSetUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleSetPassword = (event) => {
    setPassword(event.target.value);
  };

  const handleReset = (event) => {
    event.preventDefault();
    onClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      user_name: username,
      password: password,
    };

    fetch('https://prem-predictions-aavx.onrender.com/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        console.log('Registration success:', data);
        // Reset the form
        setUsername('');
        setPassword('');
        alert(`Welcome to Prem Predictions, ${username}!`);
        onClose();
      })
      .catch((error) => {
        console.error('Registration error:', error);
      });
  };

  return (
    <div className="register--container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="username--container">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleSetUsername}
          />
        </div>
        <div className="password--container">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handleSetPassword}
          />
        </div>
        <button className="register--button" type="submit">
          Submit
        </button>
        <button className="register--button" type="reset" onClick={handleReset}>
          Close
        </button>
      </form>
    </div>
  );
}