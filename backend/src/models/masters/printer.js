const db = require("../../services/db_service");
const table = "assets_printers";

const printer={
    createPrinter: async (printerData) =>{
        const [rows] = await db.query(`INSERT INTO ${table} SET ?`,printerData);
        return rows;
    },
    getAllPrinters: async () => {
        const [rows, fields] = await db.query(`SELECT * FROM ${table} ;`);
        return rows;
      },
    getPrinterById: async (id) => {
        const [rows, fields] = await db.query(
          `SELECT * FROM ${table} WHERE id = ?`,
          [id]
        );
        return rows;
      },

    getAllPrintersWithMappedData: async ()=>{
        const [rows, fields] = await db.query(`SELECT id, owned_type, warrenty, printer_id, assigned_qty, mac_address, printer_name, location, company, order_number, purchase_date, purchase_cost, serial_no, model_no, manufacturer, department, expiration_date, supplier, ip_address, network_name, status_id, inktoner_type  FROM assets_printers ;`);
        return rows;
    },

    getPrinterByPrinterIdWithMappedData: async (id) => {
        const [rows, fields] = await db.query(`SELECT id, owned_type, warrenty, printer_id, assigned_qty, mac_address, printer_name, location, company, order_number, purchase_date, purchase_cost, serial_no, model_no, manufacturer, department, expiration_date, supplier, ip_address, network_name, status_id, inktoner_type FROM assets_printers WHERE printer_id = ?` , [id]);
        return rows;
    },

    getPrinterByCondition: async (cond) => {
        const [rows, fields] = await db.query(
          `SELECT * FROM ${table} WHERE ${Object.keys(cond)
            .map((item) => `${item}= '${cond[item]}'`)
            .join(" AND ")}`
        );
        return rows;
      },
    updatePrinterById: async (id, update) => {
        const [rows] = await db.query(`UPDATE ${table} SET ? WHERE id = ?`, [update,id]
        );
        return rows;
      },
    updatePrinterByCondition: async (cond, update) => {
        const [rows] = await db.query(
          `UPDATE ${table} SET ? WHERE ${Object.keys(cond)
            .map((item) => `${item} = '${cond[item]}'`)
            .join(" AND ")}`,
          [update]
        );
        return rows;
      },
    deletePrinterById: async (id) => {
        const [rows] = await db.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
        return rows;
      },
    deletePrinterByCondition: async(cond) =>{
        const [rows] = await db.query(
          `DELETE FROM ${table} WHERE ${Object.keys(cond)
            .map((item) => `${item} = '${cond[item]}'`)
            .join(" AND ")}`
        );
        return rows;
      },
}

module.exports = printer;