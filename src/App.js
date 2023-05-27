import React, {useState} from 'react';
import Landing from './components/Landing';
import Navbar from './components/Navbar';
import Register from './components/Register';

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
      {showRegister && <Register />}
      <Landing />
    </>
  );
}

export default App;




// import React, { useState } from 'react';
// import Landing from './components/Landing';
// import Navbar from './components/Navbar';
// import Register from './components/Register';

// function App() {
//   // STATES
//   const [showRegister, setShowRegister] = useState(false);


//   // HANDLERS
//   const toggleRegister = () => {
//     setShowRegister(!showRegister);
//   };


//   return (
//    <>
//    <Navbar toggleRegister={toggleRegister} />
//    {showRegister && <Register toggleRegister={toggleRegister} />}
//    <Landing />
//    </>
//   );
// }

// export default App;
