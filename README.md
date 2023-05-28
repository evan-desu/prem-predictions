# PremPredictions

PremPredictions is a game where users can guess the scores of upcoming Premier League matches. If users guess a score correctly, they receive points. The more correct scores they get, the more points they earn. The app also displays past Premier League results. All data is sourced from the [Football-Data API](https://www.football-data.org/).

## Tech Stack

- Frontend: React/JavaScript
- Backend: Node.js, Express
- Database: PostgreSQL
- Query Builder: Knex.js
- Deployment: Render

## Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/evan-desu/prem-predictions.git
```

2. Navigate to the project directory:

```bash
cd prem-predictions
```

3. Install the necessary dependencies:

```bash
npm install
```

## Configuration

1. Create a PostgreSQL database for PremPredictions.

2. Rename the `.env.example` file to `.env` in the root directory.

3. Update the `.env` file with your PostgreSQL database credentials.

## Database Setup

1. Run the database migrations to set up the required tables:

```bash
npm run knex migrate:latest
```

2. (Optional) Run the database seeds to populate sample data:

```bash
npm run knex seed:run
```

## Usage

1. Run the app:

```bash
npm start
```

2. Open your web browser and visit `http://localhost:3000` to access PremPredictions.

## Known Issues

1. Data Fetching: There are currently issues with fetching data from the deployed server and directly from the Football-Data API. The app is only able to retrieve data when fetching from the development server (localhost) and populating the local database. Investigate and resolve the data fetching issues for a smoother user experience.

## Contributing

Contributions are welcome! If you would like to contribute to PremPredictions, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make the necessary changes and commit your code.
4. Submit a pull request with a detailed description of your changes.

## License

PremPredictions is licensed under the [MIT License](LICENSE.md).

## Contact

If you have any questions, suggestions, or issues, please feel free to contact the PremPredictions team at evan_desu@hotmail.com.com.

We hope you enjoy using PremPredictions and have fun predicting the scores of upcoming Premier League matches!

