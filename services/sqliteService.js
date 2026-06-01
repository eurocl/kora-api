
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/database.db');

function saveIncident(ip, payload) {

    return new Promise((resolve, reject) => {

        const query = `
            INSERT INTO incidents(ip, payload)
            VALUES (?, ?)
        `;

        db.run(
            query,
            [ip, JSON.stringify(payload)],
            function(err) {

                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            }
        );
    });
}

module.exports = {
    saveIncident
};

