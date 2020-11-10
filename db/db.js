/**
 * Postgres database connection pool
 * Robin Branders
 */

const { Pool } = require("pg");
const pool = new Pool({
    user: process.env.CRISTAL_DB_USER,
    host: process.env.CRISTAL_DB_HOST,
    database: process.env.CRISTAL_DB_DB,
    password: process.env.CRISTAL_DB_PWD,
    port: process.env.CRISTAL_DB_PORT
});

module.exports = { pool };
