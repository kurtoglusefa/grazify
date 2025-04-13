const express = require("express");
const router = express.Router();
const shoutModel = require("../models/shoutModel");


router.get("/", (req, res) => {
    shoutModel.getAllShouts((err, rows) => {
        if (err) {
            console.error("Error fetching shouts:", err.message);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(rows);
    });
});


router.post("/", (req, res) => {
    const { sender, receiver, message } = req.body;
    if (!sender || !receiver || !message) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    shoutModel.createShout(sender, receiver, message, (err, id) => {
        if (err) {
            console.error("Error inserting shout:", err.message);
            return res.status(500).json({ error: "Failed to save shout" });
        }
        res.status(201).json({ message: "Shout created", id });
    });
});

module.exports = router;
