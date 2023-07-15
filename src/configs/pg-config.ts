const { Pool } = require('pg')

export const databaseConnection = new Pool({
    host: process.env.PG_HOST || 'localhost',
    port: Number(process.env.PG_PORT) || 5430,
    user: process.env.PG_USER || 'postgres',
    database: process.env.PG_DB || 'postgres',
    password: process.env.PG_PASSWORD || 'password',
});

export default databaseConnection;