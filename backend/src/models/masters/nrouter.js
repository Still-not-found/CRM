const db = require("../../services/db_service");
const table = "assets_routers";

const nrouter={
    createNRouter: async (nrouterData) =>{
        const [rows] = await db.query(`INSERT INTO ${table} SET ?`,nrouterData);
        return rows;
    },
    getAllNRouters: async () => {
        const [rows, fields] = await db.query(`SELECT * FROM ${table} ;`);
        return rows;
      },
    getNRouterById: async (id) => {
        const [rows, fields] = await db.query(
          `SELECT * FROM ${table} WHERE id = ?`,
          [id]
        );
        return rows;
      },

    getAllNRoutersWithMappedData: async ()=>{
        const [rows, fields] = await db.query(`SELECT id, nrouter_id, assigned_qty, nrouter_name, location, company, order_number, purchase_date, purchase_cost, brand, model, ip_address, subnetmask, gateway, firmware, installation_date, last_maintenance_date, status_id, comments , warrenty, supplier_id  FROM assets_routers ;`);
        return rows;
    },

    getNRouterByNRouterIdWithMappedData: async (id) => {
        const [rows, fields] = await db.query(`SELECT id, nrouter_id, assigned_qty, nrouter_name, location, company, order_number, purchase_date, purchase_cost, brand, model, ip_address, subnetmask, gateway, firmware, installation_date, last_maintenance_date, status_id, comments , warrenty, supplier_id  FROM assets_routers WHERE nrouter_id = ?` , [id]);
        return rows;
    },

    getNRouterByCondition: async (cond) => {
        const [rows, fields] = await db.query(
          `SELECT * FROM ${table} WHERE ${Object.keys(cond)
            .map((item) => `${item}= '${cond[item]}'`)
            .join(" AND ")}`
        );
        return rows;
      },
    updateNRouterById: async (id, update) => {
        const [rows] = await db.query(`UPDATE ${table} SET ? WHERE id = ?`, [update,id]
        );
        return rows;
      },
    updateNRouterByCondition: async (cond, update) => {
        const [rows] = await db.query(
          `UPDATE ${table} SET ? WHERE ${Object.keys(cond)
            .map((item) => `${item} = '${cond[item]}'`)
            .join(" AND ")}`,
          [update]
        );
        return rows;
      },
    deleteNRouterById: async (id) => {
        const [rows] = await db.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
        return rows;
      },
    deleteNRouterByCondition: async(cond) =>{
        const [rows] = await db.query(
          `DELETE FROM ${table} WHERE ${Object.keys(cond)
            .map((item) => `${item} = '${cond[item]}'`)
            .join(" AND ")}`
        );
        return rows;
      },
}

module.exports = nrouter;