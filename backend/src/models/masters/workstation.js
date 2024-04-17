const db = require("../../services/db_service");
const table = "assets_workstations";

const workstation={
    createworkstation: async (workstationData) =>{
        const [rows] = await db.query(`INSERT INTO ${table} SET ?`,workstationData);
        return rows;
    },
    getAllworkstations: async () => {
        const [rows, fields] = await db.query(`SELECT * FROM ${table} ;`);
        return rows;
      },
    getworkstationById: async (id) => {
        const [rows, fields] = await db.query(
          `SELECT * FROM ${table} WHERE id = ?`,
          [id]
        );
        return rows;
      },

    getAllworkstationsWithMappedData: async ()=>{
        const [rows, fields] = await db.query(`SELECT id, workstation_name, workstation_id,  assigned_qty, location, company, order_number, purchase_date, purchase_cost,  brand, model, serial_number, ip_address, subnetmask, gateway, os, ram_capacity, storage_capacity, cpu_model, installation_date, last_maintenance_date, comments, supplier_id
        status_id FROM assets_workstations ;`);
        return rows;
    },

    getworkstationByworkstationIdWithMappedData: async (id) => {
        const [rows, fields] = await db.query(`SELECT id, workstation_name, workstation_id, assigned_qty, location, company, order_number, purchase_date, purchase_cost,  brand, model, serial_number, ip_address, subnetmask, gateway, os, ram_capacity, storage_capacity, cpu_model, installation_date, last_maintenance_date, comments, supplier_id
        status_id FROM assets_workstations WHERE workstation_id = ?` , [id]);
        return rows;
    },

    getworkstationByCondition: async (cond) => {
        const [rows, fields] = await db.query(
          `SELECT * FROM ${table} WHERE ${Object.keys(cond)
            .map((item) => `${item}= '${cond[item]}'`)
            .join(" AND ")}`
        );
        return rows;
      },
    updateworkstationById: async (id, update) => {
        const [rows] = await db.query(`UPDATE ${table} SET ? WHERE id = ?`, [update,id]
        );
        return rows;
      },
    updateworkstationByCondition: async (cond, update) => {
        const [rows] = await db.query(
          `UPDATE ${table} SET ? WHERE ${Object.keys(cond)
            .map((item) => `${item} = '${cond[item]}'`)
            .join(" AND ")}`,
          [update]
        );
        return rows;
      },
    deleteworkstationById: async (id) => {
        const [rows] = await db.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
        return rows;
      },
    deleteworkstationByCondition: async(cond) =>{
        const [rows] = await db.query(
          `DELETE FROM ${table} WHERE ${Object.keys(cond)
            .map((item) => `${item} = '${cond[item]}'`)
            .join(" AND ")}`
        );
        return rows;
      },
}

module.exports = workstation;