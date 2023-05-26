const express = require("express");
const app = express();
const PORT = 8000 || process.env.PORT;

require("dotenv").config();
const Knex = require("knex");
const knexConfig = require("./knexfile");
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);
const axios = require('axios');
const cors = require('cors');
const allowedOrigins = ["http://localhost:3000"]

app.use(express.static("public"));
app.use(express.json());
app.use(cors({
  origin: allowedOrigins,
}));

app.get('/', (req, res) => {
    res.send("I am running!");
});

app.listen(8000, () => {
    console.log(`Server is running on port ${PORT}`);
})

// const teamsDataUrl = "https://api.football-data.org/v4/competitions/PL/teams";
const apiToken = '1cd23c4390de48fea7e7c49475601586';

const fetchDataAndPopulateMatchTable = async (matchday) => {
    try {
      const apiUrl = `https://api.football-data.org/v4/competitions/PL/matches?matchday=${matchday}`;
      const response = await axios.get(apiUrl, {
        headers: { 'X-Auth-Token': apiToken },
      });
  
      const matches = response.data.matches;
      const matchesPerGameweek = 10;
      let insertedMatches = 0;
  
      for (const match of matches) {
        if (insertedMatches >= matchesPerGameweek) {
          break;
        }
  
        const homeTeamName = match.homeTeam.name;
        const homeTeamLogo = match.homeTeam.crest;
        const homeScore = match.score.fullTime.home;
        const awayTeamName = match.awayTeam.name;
        const awayTeamLogo = match.awayTeam.crest;
        const awayScore = match.score.fullTime.away;
        const gameweek = match.matchday;
        const date = match.utcDate;
  
        await knex('match').insert({
            home_team: homeTeamName,
            home_logo: homeTeamLogo,
            home_score: homeScore,
            away_team: awayTeamName,
            away_logo: awayTeamLogo,
            away_score: awayScore,
            gameweek: gameweek,
            date: date,
            expiry: knex.raw(`current_timestamp + interval '2 weeks'`),
          });
  
        insertedMatches++;
      }
    } catch (error) {
      console.error('Error while populating match table:', error);
    }
};
  
// Fetch and populate the match table for matchday 38 only
// const matchday = 37;
// fetchDataAndPopulateMatchTable(matchday);

app.get('/matches/:matchday', async (req, res) => {
  const matchday = req.params.matchday;

  try {
    // Retrieve the matches from the database based on the matchday
    const matches = await knex('match').where('gameweek', matchday).select('*');

    // Send the matches data as a response
    res.json(matches);
  } catch (error) {
    // Handle any errors
    console.error('Error while retrieving matches:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});