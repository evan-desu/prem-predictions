import React, { useState } from 'react';
import '../styles/Navbar.css';
import Login from './Login';

export default function Navbar({ toggleRegister }) {
  const [showLogin, setShowLogin] = useState(false);
  const [loggedInUsername, setLoggedInUsername] = useState(null);

  const handleLogin = (username) => {
    console.log('Logged in:', username);
    setLoggedInUsername(username);
    setShowLogin(false);
  };

  return (
    <nav className="navbar--container">
      <h4 className="navbar--logo">PPLogo</h4>
      <section className="navbar--links">
        <h4>Home</h4>
        <h4 onClick={toggleRegister}>Register</h4>
        {loggedInUsername ? (
          <h4 className="navbar--active">{loggedInUsername}</h4>
        ) : (
          <h4 className="navbar--active" onClick={() => setShowLogin(true)}>
            Login
          </h4>
        )}
        {showLogin && <Login onClose={() => setShowLogin(false)} onLogin={handleLogin} />}
      </section>
    </nav>
  );
}
