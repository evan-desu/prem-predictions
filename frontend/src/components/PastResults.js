import React, { useEffect ,useState } from 'react';
import '../styles/PastResults.css';

export default function PastResults() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://prem-predictions-aavx.onrender.com/previous-results')
        .then((response) => response.json())
        .then((data) => {
            setResults(data);
            setLoading(false);
        })
        .catch((error) => {
            console.log('Error fetching results:', error);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>Loading...</div>
    }

  return (
    <main className="results--container">
            <section className="results--table">
                <table>
                    <thead>
                        <tr>
                            <th>Matchday</th>
                            <th>Home Team</th>
                            <th>Score</th>
                            <th>Away Team</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result) => (
                            <tr key={result.id}>
                                <td>{result.gameweek}</td>
                                <td>
                                    <img className="logo" src={result.home_logo} alt={result.home_team} />
                                    {result.home_team}
                                </td>
                                <td>
                                    {result.home_score} - {result.away_score}
                                </td>
                                <td>
                                    <img className="logo" src={result.away_logo} alt={result.away_team} />
                                    {result.away_team}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </main>
  );
}