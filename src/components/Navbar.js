import React from 'react';

function Navbar() {
    return (
        <nav className="navbar--container">
          <h4 className="navbar--logo">PPLogo</h4>
          <section className="navbar--links">
            <h4>Home</h4>
            <h4>About</h4>
            <h4>Login</h4>
            <h4>Register</h4>
          </section>
        </nav>
    )
}

export default Navbar;