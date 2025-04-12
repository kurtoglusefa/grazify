const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./grazify.db', (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');

        db.run(`
            CREATE TABLE IF NOT EXISTS users
            (
                id          INTEGER PRIMARY KEY AUTOINCREMENT,
                name        TEXT NOT NULL UNIQUE,
                password    TEXT NOT NULL,
                thanksCount INTEGER DEFAULT 0
            )
        `);

        db.run("CREATE INDEX IF NOT EXISTS idx_thanksCount ON users(thanksCount DESC)");

        db.run(`
            CREATE TABLE IF NOT EXISTS shouts
            (
                id        INTEGER PRIMARY KEY AUTOINCREMENT,
                sender    TEXT NOT NULL,
                receiver  TEXT NOT NULL,
                message   TEXT NOT NULL,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
    }
});

module.exports = db;
