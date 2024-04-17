const db = require("../../services/db_service");
const table = "assets_tablets";

const Tablet={
    createTablet: async (TabletData) =>{
        const [rows] = await db.query(`INSERT INTO ${table} SET ?`,TabletData);
        return rows;
    },
    getAllTablets: async () => {
        const [rows, fields] = await db.query(`SELECT * FROM ${table} ;`);
        return rows;
      },
    getTabletById: async (id) => {
        const [rows, fields] = await db.query(
          `SELECT * FROM ${table} WHERE id = ?`,
          [id]
        );
        return rows;
      },

    getAllTabletsWithMappedData: async ()=>{
        const [rows, fields] = await db.query(`SELECT id, warrenty, tablet_id, tablet_name, assigned_qty, location, company, order_number, purchase_date, purchase_cost, brand, model, serial_number, os, storage_capacity, screen_size, color, imei, current_owner, status_id, comments,supplier_id FROM assets_tablets ;`);
        return rows;
    },

    getTabletByTabletIdWithMappedData: async (id) => {
        const [rows, fields] = await db.query(`SELECT id, warrenty, tablet_id, tablet_name, assigned_qty, location, company, order_number, purchase_date, purchase_cost, brand, model, serial_number, os, storage_capacity, screen_size, color, imei, current_owner, status_id, comments,supplier_id FROM assets_tablets WHERE tablet_id = ?` , [id]);
        return rows;
    },

    getTabletByCondition: async (cond) => {
        const [rows, fields] = await db.query(
          `SELECT * FROM ${table} WHERE ${Object.keys(cond)
            .map((item) => `${item}= '${cond[item]}'`)
            .join(" AND ")}`
        );
        return rows;
      },
    updateTabletById: async (id, update) => {
        const [rows] = await db.query(`UPDATE ${table} SET ? WHERE id = ?`, [update,id]
        );
        return rows;
      },
    updateTabletByCondition: async (cond, update) => {
        const [rows] = await db.query(
          `UPDATE ${table} SET ? WHERE ${Object.keys(cond)
            .map((item) => `${item} = '${cond[item]}'`)
            .join(" AND ")}`,
          [update]
        );
        return rows;
      },
    deleteTabletById: async (id) => {
        const [rows] = await db.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
        return rows;
      },
    deleteTabletByCondition: async(cond) =>{
        const [rows] = await db.query(
          `DELETE FROM ${table} WHERE ${Object.keys(cond)
            .map((item) => `${item} = '${cond[item]}'`)
            .join(" AND ")}`
        );
        return rows;
      },
}

module.exports = Tablet;