const Pool = require('pg').Pool;

const pool = new Pool({
	user: 'use_your_user_name',
	host: 'localhost',
	database: 'use_your_db_name',
	password: 'use_your_password',
	port: 5432,
});

module.exports = pool;
