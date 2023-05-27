const express = require("express");
const app = express();
const PORT = 8000 || process.env.PORT;

require("dotenv").config();
const Knex = require("knex");
const knexConfig = require("./knexfile");
const knex = Knex(knexConfig[process.env.NODE_ENV || "development"]);
const axios = require('axios');
const cors = require('cors');
const allowedOrigins = ["http://localhost:3000", "https://prem-predictions-top.onrender.com"]
const cron = require('node-cron');
const bcrypt = require('bcrypt');
const apiToken = '1cd23c4390de48fea7e7c49475601586';

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

//cron.schedule('0 * * * *', async () => {
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
        const utcDate = match.utcDate;

        await knex('match').insert({
          home_team: homeTeamName,
          home_logo: homeTeamLogo,
          home_score: homeScore,
          away_team: awayTeamName,
          away_logo: awayTeamLogo,
          away_score: awayScore,
          gameweek: gameweek,
          date: utcDate,
          expiry: knex.raw(`current_timestamp + interval '2 weeks'`),
        });

        insertedMatches++;
      }
    } catch (error) {
      console.error('Error while populating match table:', error);
    }
  };

  // Fetch and populate the match table for matchday 38 only
  const matchday = 38;
  fetchDataAndPopulateMatchTable(matchday);
// });

app.get('/matches/:matchday', async (req, res) => {
  const matchday = req.params.matchday;

  try {
    const matches = await knex('match').where('gameweek', matchday).select('*');

    res.json(matches);
  } catch (error) {
    console.error('Error while retrieving matches:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/upcoming-fixtures', async (req, res) => {
  const currentDate = new Date();

  try {
    const matches = await knex('match')
      .where('date', '>=', currentDate)
      .limit(20)
      .select('*');

    res.json(matches);
  } catch (error) {
    console.error('Error while retrieving matches:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/previous-results', async (req, res) => {
  try {
    const currentMatchday = 38;
    const previousMatchday = currentMatchday - 1;

    const previousResults = await knex('match')
      .where('gameweek', previousMatchday)
      .select('*');

    res.json(previousResults);
  } catch (error) {
    console.error('Error while retrieving previous results:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/users", async (req, res) => {
  try {
      const allRegisters = await knex.select("*").from("users");
      res.json(allRegisters);
  } catch (error) {
      console.error(error);
      res.status(400).send({ message: error });
  }
});


app.post("/register", async (req, res) => {
  try {
    const { user_name, password } = req.body;
    console.log(req.body);
    const hash = await bcrypt.hash(password, 10);
    console.log("Generated hash:", hash);
    await knex("users").insert({
      user_name: user_name,
      password: hash,
    });
    //console.log(`hashed password: ${password}`);
    res.status(201).send({ message: 'Password hashed successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: error });
  }
});

app.post("/login", async (req, res) => {
  try {
      const {user_name, password} = req.body;
      const user = await knex("users")
      .first("*")
      .where({user_name: user_name});
      if (user) {
          const validPassword = await bcrypt.compare(password, user.password);
          if(validPassword) {
              res.status(200).json(user.id);
          } else {
              res.json("Invalid password.");
          }
      } else {
          res.status(404).json("User not found.");
      }        
  } 
  catch (error) {
      console.error(error)
      res.status(500).send({message:error})
  }
});

/*
Still need POST "/predictions" to allow users to submit their 
predictions for a match, creating a new entry in the prediction table.
Also need GET "/leaderboard" endpoint that retrieves  leaderboard data 
from leaderboard table, allowing users to view their accumulated points.
*/