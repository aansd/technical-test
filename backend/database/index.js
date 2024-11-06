const mongoose = require('mongoose');
const config = require('../app/config');

const dbURL = `mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`;

mongoose.connect(dbURL)
.then(() => console.log('Connect to MongoDB'))
.catch(err => console.log('Fail to Connect MongoDB', err));

const db = mongoose.connection;
module.exports = db;