import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Registro_casas', // <-- Aquí el nombre de la base local
    password: '1002542140',
    port: 5432
});

export default pool;
