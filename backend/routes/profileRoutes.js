const express = require("express");
const router = express.Router();
const { getUserById } = require("../models/userModel");

// Fetch user profile by ID
router.get("/:id", (req, res) => {
    const userId = req.params.id;

    getUserById(userId, (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(404).json({ error: "User not found" });

        // ✅ Remove password before sending data
        const { id, name, thanksCount } = user;
        res.json({ id, name, thanksCount });
    });
});

// Future: Add profile update features here (e.g., change password, add avatar)

module.exports = router;
