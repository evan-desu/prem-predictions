import React from 'react'
import '../styles/Landing.css'

export default function Landing() {
    return (
        <main className="landing--container">
          <h1>Premier Predictions</h1>
          <p>How good are you at predicting the outcomes of the most exciting league in the world?</p>
          <p>Play the game to find out!</p>
          <button className="landing--enter-button">Enter</button>
        </main>
    )
}