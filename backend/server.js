const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./database");

const userRoutes = require("./routes/userRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const shoutOutRoutes = require("./routes/shoutOutRoutes");
const profileRoutes = require("./routes/profileRoutes"); // ✅ Add profile routes

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Middleware - Log Requests (Optional for Debugging)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// ✅ Routes
app.use("/users", userRoutes);
app.use("/leaderboard", leaderboardRoutes);
app.use("/shouts", shoutOutRoutes);
app.use("/profile", profileRoutes); // ✅ Profile API is now active

// Test Server Status
app.get("/", (req, res) => res.send("Backend is running!"));

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("Internal Server Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
