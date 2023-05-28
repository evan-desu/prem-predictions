import React, { useEffect, useState } from 'react';
import '../styles/Predictions.css';

export default function Predictions() {
    const [matchData, setMatchData] = useState([]);
    const [predictions, setPredictions] = useState([]);

    useEffect(() => {
        fetch('https://prem-predictions-aavx.onrender.com/upcoming-fixtures')
          .then((response) => response.json())
          .then((data) => {
            setMatchData(data);
          })
          .catch((error) => {
            console.log('Error fetching upcoming fixtures:', error);
          });
      }, []);

      const getUserId = () => {
        const userId = localStorage.getItem('user_id');
        return userId;
      };

      const renderPredictions = () => {
        return matchData.map((match) => (
          <tr key={match.id}>
            <td>
              <img className="logo" src={match.home_logo} alt={match.home_team} />
              {match.home_team}
            </td>
            <td>
              <input 
                type="text" 
                placeholder="-"
                value={predictions[match.id]?.homePrediction || ''}
                onChange={(e) => handlePredictionChange(match.id, 'homePrediction', e.target.value)} 
              />
              {" - "}
              <input 
                type="text"
                placeholder="-"
                value={predictions[match.id]?.awayPrediction || ''}
                onChange={(e) => handlePredictionChange(match.id, 'awayPrediction', e.target.value)} 
              />
            </td>
            <td>
              <img className="logo" src={match.away_logo} alt={match.away_team} />
              {match.away_team}
            </td>
          </tr>
        ));
      };

      const handlePredictionChange = (matchId, field, value) => {
        setPredictions((prevPredictions) => ({
            ...prevPredictions,
            [matchId]: {
                ...prevPredictions[matchId],
                [field]: value !== null ? value : ''
            }
        }));
      };

      const handleSubmitPredictions = () => {
        const user_id = getUserId();
        const data = Object.values(predictions).map((prediction) => ({
          user_id,
          match_id: prediction.matchId,
          home_prediction: prediction.homePrediction || 0,
          away_prediction: prediction.awayPrediction || 0
        }));
      
        fetch('http://localhost:8000/predictions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then((response) => response.json())
          .then((responseData) => {
            console.log(responseData);
          })
          .catch((error) => {
            console.log('Error submitting predictions:', error);
          });
      };
      
  return (
    <main className="predictions--container">
      <section>
        <table>
          <thead>
            <tr>
              <th>Home Team</th>
              <th>Score Prediction</th>
              <th>Away Team</th>
            </tr>
          </thead>
          <tbody>
            {renderPredictions()}
          </tbody>
        </table>
      </section>
      <button className="predictions--submit-btn" onClick={handleSubmitPredictions}>Submit Predictions</button>
    </main>
  );
}