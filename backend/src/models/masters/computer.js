const db = require("../../services/db_service");
const table = "assets_computers";

const computer={
    createComputer: async (computerData) =>{
        const [rows] = await db.query(`INSERT INTO ${table} SET ?`,computerData);
        return rows;
    },
    getAllComputers: async () => {
        const [rows, fields] = await db.query(`SELECT * FROM ${table} ;`);
        return rows;
      },
    getComputerById: async (id) => {
        const [rows, fields] = await db.query(
          `SELECT * FROM ${table} WHERE id = ?`,
          [id]
        );
        return rows;
      },

    getAllComputersWithMappedData: async ()=>{
        const [rows, fields] = await db.query(`SELECT id, invoice, po, warrenty, computer_id, name, asset_tag, serial, assigned_to, host_name, os_name, os_version, os_manufacturer, os_build_type, os_configuration, purchase_date, registered_owner, product_id, original_install_date, system_manufacturer, system_model, processor, domain , sophos, sapphire, bios_version, windows_directory, system_directory, system_locale, total_physical_ram, installed_software, order_number, billed_entity, purchase_cost, assigned_entity, supplier_id, location_id, status_id FROM assets_computers ;`);
        return rows;
    },

    getComputerByComputerIdWithMappedData: async (id) => {
        const [rows, fields] = await db.query(`SELECT id, invoice, po, warrenty, computer_id, name, asset_tag, serial, assigned_to, host_name, os_name, os_version,os_manufacturer, os_build_type, os_configuration, purchase_date, registered_owner, product_id, original_install_date, system_manufacturer, system_model, processor, domain , sophos, sapphire, bios_version, windows_directory, system_directory, system_locale, total_physical_ram, installed_software, order_number, billed_entity, purchase_cost, assigned_entity, supplier_id, location_id, status_id FROM assets_computers WHERE computer_id = ?` , [id]);
        return rows;
    },

    getComputerByCondition: async (cond) => {
        const [rows, fields] = await db.query(
          `SELECT * FROM ${table} WHERE ${Object.keys(cond)
            .map((item) => `${item}= '${cond[item]}'`)
            .join(" AND ")}`
        );
        return rows;
      },
    updateComputerById: async (id, update) => {
        const [rows] = await db.query(`UPDATE ${table} SET ? WHERE id = ?`, [update,id]
        );
        return rows;
      },
    updateComputerByCondition: async (cond, update) => {
        const [rows] = await db.query(
          `UPDATE ${table} SET ? WHERE ${Object.keys(cond)
            .map((item) => `${item} = '${cond[item]}'`)
            .join(" AND ")}`,
          [update]
        );
        return rows;
      },
    deleteComputerById: async (id) => {
        const [rows] = await db.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
        return rows;
      },
    deleteComputerByCondition: async(cond) =>{
        const [rows] = await db.query(
          `DELETE FROM ${table} WHERE ${Object.keys(cond)
            .map((item) => `${item} = '${cond[item]}'`)
            .join(" AND ")}`
        );
        return rows;
      },
}

module.exports = computer;