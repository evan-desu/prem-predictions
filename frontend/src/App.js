import React, { useState } from 'react';
import Landing from './components/Landing';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showLanding, setShowLanding] = useState(true);

  const toggleRegister = () => {
    setShowRegister(!showRegister);
    setShowLogin(false);
  };

  const handleHomeClick = () => {
    setShowLanding(true);
    setShowRegister(false);
    setShowLogin(false);
  };

  return (
    <>
      <Navbar toggleRegister={toggleRegister} onHomeClick={handleHomeClick} />
      {showRegister && <Register onClose={toggleRegister} />}
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
      {showLanding && <Landing />}
    </>
  );
}

export default App;
