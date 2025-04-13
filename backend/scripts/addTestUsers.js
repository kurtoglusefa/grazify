const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Use the correct path to the existing database
const dbPath = path.join(__dirname, '../grazify.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        return;
    }
    console.log('Connected to the SQLite database.');

    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            thanksCount INTEGER DEFAULT 0
        )
    `, (err) => {
        if (err) {
            console.error('Error creating users table:', err.message);
        } else {
            console.log('Users table verified.');

            const testUsers = [
                { name: 'Alice', password: 'password123' },
                { name: 'Bob', password: 'securepass' },
                { name: 'Charlie', password: 'testpass' },
                { name: 'Dave', password: 'mypassword' },
                { name: 'Eve', password: 'password456' },
                { name: 'Frank', password: 'frankspassword' },
                { name: 'Grace', password: 'gracepass' },
                { name: 'Heidi', password: 'heidipass' },
                { name: 'Ivan', password: 'ivanpass' },
                { name: 'Judy', password: 'judypassword' }
            ];

            testUsers.forEach(user => {
                db.run(
                    "INSERT INTO users (name, password, thanksCount) VALUES (?, ?, 0)",
                    [user.name, user.password],
                    (err) => {
                        if (err && err.code !== 'SQLITE_CONSTRAINT') {
                            console.error(`Error inserting ${user.name}:`, err.message);
                        } else if (!err) {
                            console.log(`User ${user.name} added successfully.`);
                        }
                    }
                );
            });
        }
    });
});

setTimeout(() => {
    db.close(() => {
        console.log('Database connection closed.');
    });
}, 1000);