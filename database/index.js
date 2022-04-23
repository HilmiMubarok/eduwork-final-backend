const mongoose = require('mongoose');
const { dbHost, dbPass, dbName, dbPort, dbUser, dbUrl } = require('../app/config');
const url = `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?authSource=admin`;

mongoose.connect(dbUrl);

const db = mongoose.connection;

module.exports = db;
