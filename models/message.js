const { getDBreference } = require('../database/mysql');

const db = getDBreference();

async function createMessageTable(){
    const sql = `CREATE TABLE IF NOT EXISTS messages(
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            message TEXT NOT NULL,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            conversation_id INT,
            sys_message TEXT
        )`;

    try{
        const result = await new Promise((resolve, reject) => {
            db.query(sql, (err, result) => {
                if(err) reject(err);

                else resolve(result);
            });
        })

        console.log('Message Table created or already exists.');
    } catch (err) {
        console.error('Error creating message table:', err);
        throw err;
    }
}

async function insertMessage(username, message){
    const sql = 'INSERT INTO messages (username, message) VALUES (?,?)';
    const values = [username, message];

    try{
        const result = await new Promise((resolve, reject) => {
            db.query(sql, values, (err, result) => {
                if(err) reject(err);
                else resolve(result);
            });
        });

        console.log('Message inserted into database.');
        return result;
    } catch (err) {
        console.error('Error inserting message:', err);
        throw err;
    }
}

async function getAllMessage(callback){
    const sql = 'SELECT username, message FROM messages';

    try {
        const results = await new Promise((resolve, reject) => {
            db.query(sql, (err, results) => {
                if(err) reject(err);
                else resolve(results);
            });
        });

        console.log('Messages retrieved from database');
        
        const jsonResults = results.map((row) => ({
            username: row.username,
            message: row.message
        }))

        callback(null, jsonResults);
    } catch (err) {
        console.error('Error retrieving messages:', err);
        callback(err, null);
    }
}

async function deleteTable(){
    const sql = 'DROP TABLE messages';

    try{
        const result = await new Promise((resolve, reject) => {
            db.query(sql, (err, result) => {
                if(err) reject(err);

                else resolve(result);
            });
        })

        console.log('Table deleted successfully');
    } catch (err) {
        console.error('Error deleting message table:', err);
        throw err;
    }
}

module.exports = {createMessageTable, insertMessage, getAllMessage, deleteTable};