
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');
const userRoutes = require('./routes/userRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/users', userRoutes);
app.use('/leaderboard', leaderboardRoutes);

// Server
app.get('/', (req, res) => res.send('Backend is running!'));
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
