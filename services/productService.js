const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database/database.db');

function getAllProducts() {
    return new Promise((resolve, reject) => {

        const query = `
            SELECT *
            FROM products
            ORDER BY id
        `;

        db.all(query, [], (err, rows) => {

            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }

        });
    });
}

function getProductById(id) {

    return new Promise((resolve, reject) => {

        const query = `
            SELECT *
            FROM products
            WHERE id = ?
        `;

        db.get(query, [id], (err, row) => {

            if (err) {
                reject(err);
            } else {
                resolve(row);
            }

        });
    });
}

function getProductsByCategory(category) {

    return new Promise((resolve, reject) => {

        const query = `
            SELECT *
            FROM products
            WHERE category = ?
            ORDER BY id
        `;

        db.all(query, [category], (err, rows) => {

            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }

        });
    });
}

module.exports = {
    getAllProducts,
    getProductById,
    getProductsByCategory
};