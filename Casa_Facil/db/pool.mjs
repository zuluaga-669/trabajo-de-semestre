import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'postgres',
    host: 'interchange.proxy.rlwy.net',
    database: 'railway',
    password: 'lMEfpuUevRmqDgZdQzWRVUBYzjvqNRaR', 
    port: 18498,
    ssl: {
        rejectUnauthorized: false,
    }
});

export default pool;


