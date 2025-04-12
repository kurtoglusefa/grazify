const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
    res.json({ message: "Shout-Out API is working!" });
});

module.exports = router;
