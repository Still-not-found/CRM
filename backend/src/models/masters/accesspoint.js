const db = require("../../services/db_service");
const table = "assets_accesspoints";

const accesspoint={
    createAccesspoint: async (accesspointData) =>{
        const [rows] = await db.query(`INSERT INTO ${table} SET ?`,accesspointData);
        return rows;
    },
    getAllAccesspoints: async () => {
        const [rows, fields] = await db.query(`SELECT * FROM ${table} ;`);
        return rows;
      },
    getAccesspointById: async (id) => {
        const [rows, fields] = await db.query(
          `SELECT * FROM ${table} WHERE id = ?`,
          [id]
        );
        return rows;
      },

    getAllAccesspointsWithMappedData: async ()=>{
        const [rows, fields] = await db.query(` SELECT id, warrenty, accesspoint_id, assigned_qty, accesspoint_name, location, company, order_number, purchase_date, purchase_cost, manufacturer, ip_address, subnetmask, gateway, macaddress, firmware, installation_date, last_maintenance_date, status_id, comments, supplier_id FROM assets_accesspoints;`);
        return rows;
    },

    getAccesspointByAccesspointIdWithMappedData: async (id) => {
        const [rows, fields] = await db.query(`SELECT id, warrenty, accesspoint_id, assigned_qty, accesspoint_name, location, company, order_number, purchase_date, purchase_cost, manufacturer, ip_address, subnetmask, gateway, macaddress, firmware, installation_date, last_maintenance_date, status_id, comments, supplier_id FROM assets_accesspoints WHERE accesspoint_id = ?` , [id]);
        return rows;
    },

    getAccesspointByCondition: async (cond) => {
        const [rows, fields] = await db.query(
          `SELECT * FROM ${table} WHERE ${Object.keys(cond)
            .map((item) => `${item}= '${cond[item]}'`)
            .join(" AND ")}`
        );
        return rows;
      },
    updateAccesspointById: async (id, update) => {
        const [rows] = await db.query(`UPDATE ${table} SET ? WHERE id = ?`, [update,id]
        );
        return rows;
      },
    updateAccesspointByCondition: async (cond, update) => {
        const [rows] = await db.query(
          `UPDATE ${table} SET ? WHERE ${Object.keys(cond)
            .map((item) => `${item} = '${cond[item]}'`)
            .join(" AND ")}`,
          [update]
        );
        return rows;
      },
    deleteAccesspointById: async (id) => {
        const [rows] = await db.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
        return rows;
      },
    deleteAccesspointByCondition: async(cond) =>{
        const [rows] = await db.query(
          `DELETE FROM ${table} WHERE ${Object.keys(cond)
            .map((item) => `${item} = '${cond[item]}'`)
            .join(" AND ")}`
        );
        return rows;
      },
}

module.exports = accesspoint;