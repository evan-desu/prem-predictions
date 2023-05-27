import React, { useState } from 'react';
import Selection from './Selection';
import PastResults from './PastResults';
import '../styles/Landing.css';

export default function Landing() {
  const [showSelection, setShowSelection] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [showPastResults, setShowPastResults] = useState(false);

  const handleEnterClick = () => {
    setShowSelection(true);
    setShowLanding(false);
  };

  const handleSeePastResults = () => {
    setShowPastResults(true);
    setShowSelection(false);
  };

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
        <Selection onSeePastResults={handleSeePastResults} />
      )}

      {showPastResults && (
        <PastResults />
      )}
    </main>
  );
}



/*

import React, {useState} from 'react';
import Selection from './Selection';
import '../styles/Landing.css';

export default function Landing() {
  const [showSelection, setShowSelection] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [showPastResults, setShowPastResults] = useState(false);

  const handleEnterClick = () => {
    setShowSelection(true);
    setShowLanding(false);
  };

  const handleSeePastResults = () => {
    setShowPastResults(true);
  };

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

          {showSelection && (<Selection showPastResults={showPastResults} onSeePastResults={handleSeePastResults} />
          )}
        </main>
    );
}

*/