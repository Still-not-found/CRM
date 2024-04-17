const db = require("../../services/db_service");
const table = "assets_uworkstations";

const uworkstation={
    createuworkstation: async (uworkstationData) =>{
        const [rows] = await db.query(`INSERT INTO ${table} SET ?`,uworkstationData);
        return rows;
    },
    getAlluworkstations: async () => {
        const [rows, fields] = await db.query(`SELECT * FROM ${table} ;`);
        return rows;
      },
    getuworkstationById: async (id) => {
        const [rows, fields] = await db.query(
          `SELECT * FROM ${table} WHERE id = ?`,
          [id]
        );
        return rows;
      },

    getAlluworkstationsWithMappedData: async ()=>{
        const [rows, fields] = await db.query(`SELECT id, uworkstation_name, uworkstation_id, assigned_qty, location, company, order_number, purchase_date, purchase_cost, supplier_id
        FROM assets_uworkstations ;`);
        return rows;
    },

    getuworkstationByuworkstationIdWithMappedData: async (id) => {
        const [rows, fields] = await db.query(`SELECT id, uworkstation_name, uworkstation_id, assigned_qty, location, company, order_number, purchase_date, purchase_cost, supplier_id
        FROM assets_uworkstations WHERE uworkstation_id = ?` , [id]);
        return rows;
    },

    getuworkstationByCondition: async (cond) => {
        const [rows, fields] = await db.query(
          `SELECT * FROM ${table} WHERE ${Object.keys(cond)
            .map((item) => `${item}= '${cond[item]}'`)
            .join(" AND ")}`
        );
        return rows;
      },
    updateuworkstationById: async (id, update) => {
        const [rows] = await db.query(`UPDATE ${table} SET ? WHERE id = ?`, [update,id]
        );
        return rows;
      },
    updateuworkstationByCondition: async (cond, update) => {
        const [rows] = await db.query(
          `UPDATE ${table} SET ? WHERE ${Object.keys(cond)
            .map((item) => `${item} = '${cond[item]}'`)
            .join(" AND ")}`,
          [update]
        );
        return rows;
      },
    deleteuworkstationById: async (id) => {
        const [rows] = await db.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
        return rows;
      },
    deleteuworkstationByCondition: async(cond) =>{
        const [rows] = await db.query(
          `DELETE FROM ${table} WHERE ${Object.keys(cond)
            .map((item) => `${item} = '${cond[item]}'`)
            .join(" AND ")}`
        );
        return rows;
      },
}

module.exports = uworkstation;