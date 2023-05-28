import React, { useState } from 'react';
import Selection from './Selection';
import PastResults from './PastResults';
import Predictions from './Predictions';
import '../styles/Landing.css';

export default function Landing() {
  const [showSelection, setShowSelection] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [showPastResults, setShowPastResults] = useState(false);
  const [showPredictions, setShowPredictions] = useState(false);

  const handleEnterClick = () => {
    setShowSelection(true);
    setShowLanding(false);
  };

  const handleSeePastResults = () => {
    setShowPastResults(true);
    setShowSelection(false);
    setShowPredictions(false);
  };

  const handleMakePredictions = () => {
    setShowPredictions(true);
    setShowSelection(false);
    setShowPastResults(false);
  }

  return (
    <main>
      {showLanding && (
        <section className="landing--container">
          <h1>Premier Predictions</h1>
          <p>How good are you at predicting the outcomes of the most exciting league in the world?</p>
          <p>Play the game to find out!</p>
          <button className="landing--enter-button" onClick={handleEnterClick}>Enter</button>
        </section>
      )}

      {showSelection && (
        <Selection
          onSeePastResults={handleSeePastResults} 
          onMakePredictions={handleMakePredictions}
        />
      )}

      {showPredictions && (
        <Predictions />
      )}

      {showPastResults && (
        <PastResults />
      )}
    </main>
  );
}