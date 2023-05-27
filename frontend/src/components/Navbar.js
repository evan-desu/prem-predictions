import React from 'react';
import '../styles/Navbar.css';

export default function Navbar({ toggleRegister }) {
  return (
    <nav className="navbar--container">
      <h4 className="navbar--logo">PPLogo</h4>
      <section className="navbar--links">
        <h4>Home</h4>
        <h4 onClick={toggleRegister}>Register</h4>
        <h4>Login</h4>
      </section>
    </nav>
  );
}