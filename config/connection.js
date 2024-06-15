//Note: importing sequilize
const Sequelize = require('sequelize');

//Note: env variables
require('dotenv').config();

//Note: Declaring variable to hold sequilize instance, checking if application is deployed, if JAWSDB_URL is present intialize sequelize, otherwise initialize with mysql
let sequilize;

if (process.env.JAWSDB_URL) {
    sequilize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequilize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    });
}

module.exports = sequilize;
