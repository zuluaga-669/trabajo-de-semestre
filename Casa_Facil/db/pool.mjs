import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'postgres',
    host: 'switchyard.proxy.rlwy.net',
    database: 'railway',
    password: 'ZuviHmFKNRxVbdlRBWHYpJdSMLtAjvbq', 
    port: 20961,
    ssl: {
        rejectUnauthorized: false,
    }
});

export default pool;


