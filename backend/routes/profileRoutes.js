const express = require("express");
const router = express.Router();
const { getUserById } = require("../models/userModel");

router.get("/:id", (req, res) => {
    const userId = req.params.id;

    getUserById(userId, (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(404).json({ error: "User not found" });
        const { id, name, thanksCount } = user;
        res.json({ id, name, thanksCount });
    });
});

module.exports = router;
