const mongoose = require('mongoose');

const Database_connection = async (database_uri) => {
    try {
        mongoose.connect(`${database_uri}/ttsDB`);
        console.log("the database is connected successfully");
    } catch (error) {
        console.log("database connection is failed to connect", error);
    }
}

module.exports = Database_connection;