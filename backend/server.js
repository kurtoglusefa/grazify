const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database");

const userRoutes = require("./routes/userRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const shoutOutRoutes = require("./routes/shoutOutRoutes");
const profileRoutes = require("./routes/profileRoutes");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});


app.use("/users", userRoutes);
app.use("/leaderboard", leaderboardRoutes);
app.use("/shouts", shoutOutRoutes);
app.use("/profile", profileRoutes);

app.get("/", (req, res) => res.send("Backend is running!"));

app.use((err, req, res, next) => {
    console.error("Internal Server Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
