const express = require('express');
const Database_connection = require('./database_connection/db');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5000;

const MONGOOSE_URI = process.env.MONGOOSE_URI;

Database_connection(MONGOOSE_URI);

app.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}`);
});