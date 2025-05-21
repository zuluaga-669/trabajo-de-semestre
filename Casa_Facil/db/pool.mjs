import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'casa_facil',
    password: 'tu_contraseña', // Cambia esto por tu contraseña de PostgreSQL
    port: 5432,
});

export default pool;


