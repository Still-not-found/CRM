const db = require("../services/db_service");
const table = "users";

const UserModel = {
  createUser: async (user) => {
    const [rows] = await db.query(`INSERT INTO ${table} SET ?`, user);
    return rows;
  },
  getAllUsers: async () => {
    const [rows, fields] = await db.query(`SELECT * FROM ${table}`);
    return rows;
  },
  getUserById: async (id) => {
    const [rows, fields] = await db.query(
      `SELECT * FROM ${table} WHERE id = ?`,
      [id]
    );
    return rows;
  },
  getUsersByCondition: async (cond) => {
    const [rows, fields] = await db.query(
      `SELECT * FROM ${table} WHERE ${Object.keys(cond)
        .map((item) => `${item} = '${cond[item]}'`)
        .join(" AND ")}`
    );
    return rows;
  },
  updateUserById: async (id, update) =>{
    const [rows] = await db.query(
      `UPDATE ${table} SET ? WHERE id = ?`,[update,id]
    );
    return rows;
  },
 updateUserByCondition: async (cond, update) =>{
  const [rows] = await db.query(
    `UPDATE ${table} SET ? WHERE ${Object.keys(cond)
      .map((item) => `${item} = '${cond[item]}'`)
      .join(" AND ")}`,[update]
  );
  return rows;
 },
  deleteUserById: async(id) =>{
    const [rows] = await db.query(
      `DELETE FROM ${table} WHERE id = ?`,
      [id]
    );
    return rows;
  },
  deleteUserByCondition: async(cond) =>{
    const [rows] = await db.query(
      `DELETE FROM ${table} WHERE ${Object.keys(cond)
        .map((item) => `${item} = '${cond[item]}'`)
        .join(" AND ")}`
    );
    return rows;
  }
};

module.exports = UserModel;
