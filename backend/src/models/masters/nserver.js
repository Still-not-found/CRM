const db = require("../../services/db_service");
const table = "assets_servers";

const nserver={
    createNServer: async (nserverData) =>{
        const [rows] = await db.query(`INSERT INTO ${table} SET ?`,nserverData);
        return rows;
    },
    getAllNServers: async () => {
        const [rows, fields] = await db.query(`SELECT * FROM ${table} ;`);
        return rows;
      },
    getNServerById: async (id) => {
        const [rows, fields] = await db.query(
          `SELECT * FROM ${table} WHERE id = ?`,
          [id]
        );
        return rows;
      },

    getAllNServersWithMappedData: async ()=>{
        const [rows, fields] = await db.query(`SELECT id, nserver_id, assigned_qty, nserver_name, location, company, order_number, purchase_date, purchase_cost, brand, model, serial_number, ip_address, subnetmask, gateway, operating_system, ram_capacity, storage_capacity, cpu_model, installation_date, last_maintenance_date, status_id, comments , supplier_id  FROM assets_servers ;`);
        return rows;
    },

    getNServerByNServerIdWithMappedData: async (id) => {
        const [rows, fields] = await db.query(`SELECT id, nserver_id, assigned_qty, nserver_name, location, company, order_number, purchase_date, purchase_cost, brand, model, serial_number, ip_address, subnetmask, gateway, operating_system, ram_capacity, storage_capacity, cpu_model, installation_date, last_maintenance_date, status_id, comments , supplier_id  FROM assets_servers WHERE nserver_id = ?` , [id]);
        return rows;
    },

    getNServerByCondition: async (cond) => {
        const [rows, fields] = await db.query(
          `SELECT * FROM ${table} WHERE ${Object.keys(cond)
            .map((item) => `${item}= '${cond[item]}'`)
            .join(" AND ")}`
        );
        return rows;
      },
    updateNServerById: async (id, update) => {
        const [rows] = await db.query(`UPDATE ${table} SET ? WHERE id = ?`, [update,id]
        );
        return rows;
      },
    updateNServerByCondition: async (cond, update) => {
        const [rows] = await db.query(
          `UPDATE ${table} SET ? WHERE ${Object.keys(cond)
            .map((item) => `${item} = '${cond[item]}'`)
            .join(" AND ")}`,
          [update]
        );
        return rows;
      },
    deleteNServerById: async (id) => {
        const [rows] = await db.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
        return rows;
      },
    deleteNServerByCondition: async(cond) =>{
        const [rows] = await db.query(
          `DELETE FROM ${table} WHERE ${Object.keys(cond)
            .map((item) => `${item} = '${cond[item]}'`)
            .join(" AND ")}`
        );
        return rows;
      },
}

module.exports = nserver;