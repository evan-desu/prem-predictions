import React, {useState} from 'react';
import Landing from './components/Landing';
import Navbar from './components/Navbar';
import Register from './components/Register';
// import Selection from './components/Selection';

function App() {
  // STATE
  const [showRegister, setShowRegister] = useState(false);

  // HANDLERS
  const toggleRegister = () => {
    setShowRegister(!showRegister);
  };

  return (
    <>
      <Navbar toggleRegister={toggleRegister} />
      {showRegister && <Register onClose={toggleRegister} />}
      <Landing />
      {/* < Selection /> */}
    </>
  );
}

export default App;