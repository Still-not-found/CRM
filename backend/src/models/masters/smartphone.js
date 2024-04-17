const db = require("../../services/db_service");
const table = "assets_smartphones";

const Smartphone={
    createSmartphone: async (SmartphoneData) =>{
        const [rows] = await db.query(`INSERT INTO ${table} SET ?`,SmartphoneData);
        return rows;
    },
    getAllSmartphones: async () => {
        const [rows, fields] = await db.query(`SELECT * FROM ${table} ;`);
        return rows;
      },
    getSmartphoneById: async (id) => {
        const [rows, fields] = await db.query(
          `SELECT * FROM ${table} WHERE id = ?`,
          [id]
        );
        return rows;
      },

    getAllSmartphonesWithMappedData: async ()=>{
        const [rows, fields] = await db.query(`SELECT id, warrenty, smartphone_id, assigned_qty, location, company, order_number, purchase_date, purchase_cost, brand, model, imei, os, storage_capacity, screen_size, color, serial_number, warranty_expiry_date, current_owner, status_id, comments,supplier_id, smartphone_name FROM assets_smartphones ;`);
        return rows;
    },

    getSmartphoneBySmartphoneIdWithMappedData: async (id) => {
        const [rows, fields] = await db.query(`SELECT id, warrenty, smartphone_id, assigned_qty, location, company, order_number, purchase_date, purchase_cost, brand, model, imei, os, storage_capacity, screen_size, color, serial_number, warranty_expiry_date, current_owner, status_id, comments,supplier_id, smartphone_name FROM assets_smartphones WHERE smartphone_id = ?` , [id]);
        return rows;
    },

    getSmartphoneByCondition: async (cond) => {
        const [rows, fields] = await db.query(
          `SELECT * FROM ${table} WHERE ${Object.keys(cond)
            .map((item) => `${item}= '${cond[item]}'`)
            .join(" AND ")}`
        );
        return rows;
      },
    updateSmartphoneById: async (id, update) => {
        const [rows] = await db.query(`UPDATE ${table} SET ? WHERE id = ?`, [update,id]
        );
        return rows;
      },
    updateSmartphoneByCondition: async (cond, update) => {
        const [rows] = await db.query(
          `UPDATE ${table} SET ? WHERE ${Object.keys(cond)
            .map((item) => `${item} = '${cond[item]}'`)
            .join(" AND ")}`,
          [update]
        );
        return rows;
      },
    deleteSmartphoneById: async (id) => {
        const [rows] = await db.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
        return rows;
      },
    deleteSmartphoneByCondition: async(cond) =>{
        const [rows] = await db.query(
          `DELETE FROM ${table} WHERE ${Object.keys(cond)
            .map((item) => `${item} = '${cond[item]}'`)
            .join(" AND ")}`
        );
        return rows;
      },
}

module.exports = Smartphone;