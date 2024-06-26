const {Pool} = require('pg');
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'STT',
    password: 'postgres',
    schema: 'thomas',
    port: 5432
});
pool.on('connect', client =>{
        client.query('set search_path to persons')
});
module.exports = {
    query: (text, params) => {
        return pool.query(text, params)
    }
};
