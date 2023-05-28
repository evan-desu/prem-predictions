
import React, {useState} from 'react';
import Landing from './components/Landing';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login'
// import Selection from './components/Selection';

function App() {
  // STATE
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // HANDLERS
  const toggleRegister = () => {
    setShowRegister(!showRegister);
    setShowLogin(false);
  };

  return (
    <>
      <Navbar toggleRegister={toggleRegister} setShowLogin={setShowLogin} />
      {showRegister && <Register onClose={toggleRegister} />}
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
      <Landing />
      {/* < Selection /> */}
    </>
  );
}

export default App;