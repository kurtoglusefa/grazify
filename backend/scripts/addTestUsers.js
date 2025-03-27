const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./grazify.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        return;
    }
    console.log('Connected to the SQLite database.');

    // Ensure the users table exists
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

            // Insert test users
            const testUsers = [
                { name: 'Alice', password: 'password123' },
                { name: 'Bob', password: 'securepass' },
                { name: 'Charlie', password: 'testpass' }
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

// Close the database after executing queries
setTimeout(() => {
    db.close(() => {
        console.log('Database connection closed.');
    });
}, 1000);
