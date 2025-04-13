const db = require("../database");


const getAllShouts = (callback) => {
    db.all("SELECT * FROM shouts ORDER BY timestamp DESC", [], (err, rows) => {
        callback(err, rows);
    });
};


const createShout = (sender, receiver, message, callback) => {
    const query = `
    INSERT INTO shouts (sender, receiver, message)
    VALUES (?, ?, ?)
  `;
    db.run(query, [sender, receiver, message], function (err) {
        if (err) return callback(err, null);
        callback(null, this.lastID);
    });
};

module.exports = {
    getAllShouts,
    createShout,
};
