const express = require("express");
const router = express.Router();
const db = require("../database");

// Get leaderboard with pagination & sorting
router.get("/", (req, res) => {
    const { page = 1, limit = 5, sort = "thanksCount" } = req.query; // Default values
    const offset = (page - 1) * limit;

    let orderByClause = "ORDER BY thanksCount DESC";
    if (sort === "name") {
        orderByClause = "ORDER BY name ASC";
    }

    const query = `
        SELECT id, name, thanksCount 
        FROM users 
        ${orderByClause}
        LIMIT ? OFFSET ?
    `;

    db.all(query, [limit, offset], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

module.exports = router;
