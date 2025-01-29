const db = require('../database');

const getUserById = (id, callback) => {
    db.get('SELECT * FROM users WHERE id = ?', [id], callback);
};

const createUser = (name, password, callback) => {
    db.run(
        'INSERT INTO users (name, password) VALUES (?, ?)',
        [name, password],
        function (err) {
            callback(err, this.lastID);
        }
    );
};

const incrementThanks = (id, callback) => {
    db.run(
        'UPDATE users SET thanksCount = thanksCount + 1 WHERE id = ?',
        [id],
        function (err) {
            callback(err, this.changes);
        }
    );
};

module.exports = { getUserById, createUser, incrementThanks };
