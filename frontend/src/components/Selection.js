import React, { useEffect, useState } from 'react';
import '../styles/Selection.css';
import Predictions from './Predictions';

export default function Selection({ onSeePastResults, onMakePredictions }) {
  const [upcomingFixtures, setUpcomingFixtures] = useState([]);
  const [showPredictions, setShowPredictions] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/upcoming-fixtures')
      .then((response) => response.json())
      .then((data) => {
        setUpcomingFixtures(data);
      })
      .catch((error) => {
        console.log('Error fetching upcoming fixtures:', error);
      });
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleString('ja-JP', options).slice(0, 10);
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const handleMakePredictions = () => {
    onMakePredictions();
    setShowPredictions(true);
  }

  return (
    <main className="selection--container">
      <section className="selection--buttons">
        <button onClick={handleMakePredictions}>Make Predictions</button>
        <button onClick={onSeePastResults}>See Past Results</button>
        <button>View Leaderboard</button>
      </section>
      <section className="selection--upcoming-fixtures">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Home Team</th>
              <th>Kickoff</th>
              <th>Away Team</th>
            </tr>
          </thead>
          <tbody>
            {upcomingFixtures.map((fixture) => (
              <tr key={fixture.id}>
                <td>{formatDate(fixture.date)}</td>
                <td>
                  <img className="logo" src={fixture.home_logo} alt={fixture.home_team} />
                  {fixture.home_team}
                </td>
                <td>{formatTime(fixture.date)}</td>
                <td>
                  <img className="logo" src={fixture.away_logo} alt={fixture.away_team} />
                  {fixture.away_team}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {showPredictions && <Predictions />}
    </main>
  );
}
