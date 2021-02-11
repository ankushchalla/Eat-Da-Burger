// server.js handles interactions with the database. 

const connection = require('./connection');

// Methods we need: Getting all burgers, adding a burger, devouring a burger.
const orm = {
    getAll() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM burgers', (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }, 
    addBurger(burger) {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO burgers (burger) VALUES (?)', [burger], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    },
    getID(burger) {
        return new Promise((resolve, reject) => {
            let query = 'SELECT (id) FROM burgers WHERE burger = ?';
            connection.query(query, [burger], (err, result) => {
                if (err) reject(err);
                resolve(result[0].id);
            });
        });
    },
    devour(burger) {
        return new Promise(async (resolve, reject) => {
            let burgerID = await this.getID(burger);
            connection.query('DELETE FROM burgers WHERE id = ?', [burgerID], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }
};

module.exports = orm;

