const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./grazify.db', (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                password TEXT NOT NULL,
                thanksCount INTEGER DEFAULT 0
            )
        `);
    }
});

module.exports = db;
