const express = require('express');
const router = express.Router();
const { getUserById, createUser } = require('../models/userModel');

router.post('/login', (req, res) => {
    const { name, password } = req.body;
    getUserById(name, (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user || user.password !== password)
            return res.status(401).json({ error: 'Invalid credentials' });
        res.json({ message: 'Login successful', user });
    });
});

router.post('/register', (req, res) => {
    const { name, password } = req.body;
    createUser(name, password, (err, id) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'User registered', userId: id });
    });
});

module.exports = router;
