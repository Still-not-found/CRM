const mysql = require('mysql2');
const dbConfig = require('../configs/db_configs');

const dbService ={
  query: async (sql, params) => {
    const connection = mysql.createConnection(dbConfig).promise();
    const result = await connection.query(sql, params);
    await connection.end();
    return result;
  },
  execute: async (sql, params) => {
    const connection = mysql.createConnection(dbConfig).promise();
    return await connection.execute(sql, params);
  },
  pool: async (sql, params)=> {
    const pool = mysql.createPool(dbConfig).promise();
    return await pool.query(sql, params);
  }
}

module.exports = dbService;