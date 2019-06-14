const { Pool } = require('pg');

const pool = new Pool({
  user: 'khushbu.jain',
  host: 'localhost',
  database: 'website',
  password: 'khushbu@2018',
  port: 5432,
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}
