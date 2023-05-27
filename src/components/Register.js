import React, { useState } from 'react';
import '../styles/Register.css';

export default function Register() {
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
        // Display success message or perform any other actions
        alert('Successfully registered!');
      })
      .catch((error) => {
        console.error('Registration error:', error);
        // Handle error scenarios or display error message
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
        <button className="register--button" type="reset">
          Close
        </button>
      </form>
    </div>
  );
}



// import React, { useState } from 'react';
// import '../styles/Register.css';

// export default function Register({ toggleRegister }) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
  
//   const handleSetUsername = (event) => {
//     setUsername(event.target.value);
//   };

//   const handleSetPassword = (event) => {
//     setPassword(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     fetch('https://prem-predictions-aavx.onrender.com/register', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ username, password }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         // Handle the response from the server
//         alert("Successfully registered!")
//         console.log(`data: ${data}`); 
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });

//     setUsername("");
//     setPassword("");
//   };

//   return (
//     <div className='register--container'>
//       <h1>Register</h1>
//       <form onSubmit={handleSubmit}>
//         <div className='username--container'>
//           <label htmlFor='username'>Username:</label>
//           <input type='text' id='username' value={username} onChange={handleSetUsername} 
//           />
//         </div>
//         <div className='password--container'>
//           <label htmlFor='password'>Password:</label>
//           <input type='password' id='password' value={password} onChange={handleSetPassword} 
//           />
//         </div>
//         <button className="register--button" type="submit">Submit</button>
//         <button className="register--button" type="reset" onClick={toggleRegister}>Close</button>
//       </form>
//     </div>
//   )
// }