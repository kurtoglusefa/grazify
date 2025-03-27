const express = require("express");
const router = express.Router();

// Example route - replace with actual logic
router.post("/", (req, res) => {
    res.json({ message: "Shout-Out API is working!" });
});

module.exports = router;
