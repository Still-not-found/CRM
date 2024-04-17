const db = require("../../services/db_service");
const table = "assets_status";

const status={
    createStatus: async (statusData={}) =>{
        const [rows] = await db.query(`INSERT INTO ${table} SET ?`,statusData);
        return rows;
    },
    getAllStatus: async () => {
        const [rows, fields] = await db.query(`SELECT * FROM ${table} ;`);
        return rows;
      },
      getStatusById: async (id) => {
        const [rows, fields] = await db.query(
          `SELECT * FROM ${table} WHERE id = ?`,
          [id]
        );
        return rows;
      },
      getAllStatusWithMappedData: async ()=>{
        const [rows, fields] = await db.query(`SELECT id, status_id, status_name, status_code FROM assets_status ;`);
        return rows;
    },

    getStatusByStatusIdWithMappedData: async (id) => {
        const [rows, fields] = await db.query(`SELECT id, status_id, status_name, status_code FROM assets_status WHERE status_id = ?` , [id]);
        return rows;
    },
      getStatusByCondition: async (cond) => {
        const [rows, fields] = await db.query(
          `SELECT * FROM ${table} WHERE ${Object.keys(cond)
            .map((item) => `${item}= '${cond[item]}'`)
            .join(" AND ")}`
        );
        return rows;
      },
      updateStatusById: async (id, update) => {
        const [rows] = await db.query(`UPDATE ${table} SET ? WHERE id = ?`, [
          update,
          id,
        ]);
        return rows;
      },
      updateStatusByCondition: async (cond, update) => {
        const [rows] = await db.query(
          `UPDATE ${table} SET ? WHERE ${Object.keys(cond)
            .map((item) => `${item} = '${cond[item]}'`)
            .join(" AND ")}`,
          [update]
        );
        return rows;
      },
      deleteStatusById: async (id) => {
        const [rows] = await db.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
        return rows;
      },
      deleteStatusByCondition: async(cond) =>{
        const [rows] = await db.query(
          `DELETE FROM ${table} WHERE ${Object.keys(cond)
            .map((item) => `${item} = '${cond[item]}'`)
            .join(" AND ")}`
        );
        return rows;
      },
}

module.exports = status;