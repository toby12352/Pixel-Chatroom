require('dotenv').config();
const mysql = require("mysql");

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, //Need to be ecrpyted
    database: process.env.DATABASE
})

db.connect(err => {
    if(err){
        console.log(err.message);
        return;
    }
    console.log("Database Connected.");
})

exports.getDBreference = function () {
    return db;
}