const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const {
    getUserById,
    getUserByName,
    getAllUsers,
    createUser,
    incrementThanks,
    getUserBadges
} = require("../models/userModel");

// Get all users (for dropdown selection)
router.get("/", (req, res) => {
    getAllUsers((err, users) => {
        if (err) return res.status(500).json({error: err.message});
        res.json(users);
    });
});

// User Login
router.post("/login", async (req, res) => {
    const {name, password} = req.body;

    try {
        const user = await new Promise((resolve, reject) => {
            getUserByName(name, (err, user) => {
                if (err) reject(err);
                else resolve(user);
            });
        });

        if (!user) return res.status(401).json({error: "Invalid credentials"});

        // Compare hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) return res.status(401).json({error: "Invalid credentials"});

        // Remove password from response
        const {id, thanksCount} = user;
        res.json({message: "Login successful", user: {id, name, thanksCount}});

    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

// Fetch User Profile
router.get("/profile/:id", (req, res) => {
    const userId = req.params.id;

    getUserById(userId, (err, user) => {
        if (err) return res.status(500).json({error: err.message});
        if (!user) return res.status(404).json({error: "User not found"});

        res.json(user);
    });
});

// Fetch User Badges
router.get("/profile/:id/badges", (req, res) => {
    const userId = req.params.id;

    getUserBadges(userId, (err, badges) => {
        if (err) return res.status(500).json({error: err.message});
        res.json({badges});
    });
});

// User Registration
router.post("/register", async (req, res) => {
    const {name, password} = req.body;

    if (!name || !password) {
        return res.status(400).json({error: "Username and password are required"});
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    createUser(name, hashedPassword, (err, id) => {
        if (err) return res.status(500).json({error: err.message});
        res.json({message: "User registered successfully", userId: id});
    });
});

// Increment Thanks Count
router.post("/thanks/:id", (req, res) => {
    const userId = req.params.id;

    incrementThanks(userId, (err, changes) => {
        if (err) return res.status(500).json({error: err.message});
        if (changes === 0) return res.status(404).json({error: "User not found"});

        res.json({message: "Thanks sent successfully!"});
    });
});

module.exports = router;
