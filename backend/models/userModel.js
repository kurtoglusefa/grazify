const db = require("../database");

// Get user by ID (for fetching profile)
const getUserById = (id, callback) => {
    db.get("SELECT id, name, thanksCount FROM users WHERE id = ?", [id], (err, row) => {
        callback(err, row);
    });
};

// Get user by username (for login)
const getUserByName = (name, callback) => {
    db.get("SELECT * FROM users WHERE name = ?", [name], (err, row) => {
        callback(err, row);
    });
};

// Get all users (excluding passwords)
const getAllUsers = (callback) => {
    db.all("SELECT id, name, thanksCount FROM users", [], (err, rows) => {
        callback(err, rows);
    });
};

// Create a new user (ensures unique username)
const createUser = (name, hashedPassword, callback) => {
    db.get("SELECT * FROM users WHERE name = ?", [name], (err, existingUser) => {
        if (err) return callback(err, null);
        if (existingUser) return callback(new Error("User already exists"), null);

        db.run(
            "INSERT INTO users (name, password, thanksCount) VALUES (?, ?, 0)",
            [name, hashedPassword],
            function (err) {
                callback(err, this.lastID);
            }
        );
    });
};

// Increment thanks count for a user
const incrementThanks = (id, callback) => {
    db.run(
        "UPDATE users SET thanksCount = thanksCount + 1 WHERE id = ?",
        [id],
        function (err) {
            callback(err, this.changes);
        }
    );
};

// Get user badges based on their thanks count
const getUserBadges = (id, callback) => {
    db.get("SELECT thanksCount FROM users WHERE id = ?", [id], (err, row) => {
        if (err) return callback(err, null);
        if (!row) return callback(null, []);

        let badges = [];
        if (row.thanksCount >= 10) badges.push("Helpful Hero");
        if (row.thanksCount >= 25) badges.push("Community Star");
        if (row.thanksCount >= 50) badges.push("MVP of the Month");

        callback(null, badges);
    });
};

module.exports = {
    getUserById,
    getUserByName,
    getAllUsers,
    createUser,
    incrementThanks,
    getUserBadges
};
