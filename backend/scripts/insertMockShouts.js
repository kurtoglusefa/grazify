const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('../grazify.db', (err) => {
    if (err) {
        return console.error('Error opening database:', err.message);
    }

    console.log('Connected to the SQLite database.');

    const shouts = [
        { sender: "Alice", receiver: "Bob", message: "Thanks for your help on the project!" },
        { sender: "Charlie", receiver: "Diana", message: "Great presentation yesterday!" },
        { sender: "Bob", receiver: "Alice", message: "Appreciate your support in the meeting!" },
        { sender: "Diana", receiver: "Charlie", message: "Thanks for sharing those resources!" },
        { sender: "Eve", receiver: "Frank", message: "Your code review was super helpful!" },
        { sender: "Grace", receiver: "Heidi", message: "Thanks for being a great teammate!" },
        { sender: "Ivan", receiver: "Judy", message: "Loved your insights during the discussion!" },
        { sender: "Mallory", receiver: "Niaj", message: "Thanks for the quick turnaround on that task!" },
        { sender: "Oscar", receiver: "Peggy", message: "Your feedback was invaluable!" },
        { sender: "Trent", receiver: "Victor", message: "Thanks for always being so supportive!" },
        { sender: "Walter", receiver: "Xena", message: "Great job on the last sprint!" },
        { sender: "Yara", receiver: "Zane", message: "Your hard work is truly appreciated!" },
        { sender: "Alice", receiver: "Charlie", message: "Thanks for the brainstorming session!" },
        { sender: "Bob", receiver: "Diana", message: "Your attention to detail is impressive!" },
        { sender: "Eve", receiver: "Frank", message: "Thanks for the quick response!" },
        { sender: "Grace", receiver: "Heidi", message: "Your creativity is inspiring!" },
        { sender: "Ivan", receiver: "Judy", message: "Thanks for being a great mentor!" },
        { sender: "Mallory", receiver: "Niaj", message: "Your support means a lot!" },
        { sender: "Oscar", receiver: "Peggy", message: "Thanks for your patience!" },
        { sender: "Trent", receiver: "Victor", message: "Your leadership is commendable!" },
        { sender: "Walter", receiver: "Xena", message: "Thanks for always being there!" },
        { sender: "Yara", receiver: "Zane", message: "Your positivity is contagious!" }
    ];

    const insertQuery = `
        INSERT INTO shouts (sender, receiver, message)
        VALUES (?, ?, ?)
    `;

    db.serialize(() => {
        const stmt = db.prepare(insertQuery);

        shouts.forEach(({ sender, receiver, message }) => {
            stmt.run(sender, receiver, message);
        });

        stmt.finalize((err) => {
            if (err) {
                return console.error("Error inserting shouts:", err.message);
            }

            console.log("Mock shout-outs inserted successfully.");
            db.close();
        });
    });
});
