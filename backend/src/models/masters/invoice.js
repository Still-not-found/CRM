const db = require("../../services/db_service");
const table = "invoices";

const invoice={
    createInvoice: async (invoiceData) =>{
        const [rows] = await db.query(`INSERT INTO ${table} SET ?`,invoiceData);
        return rows;
    },
    getAllInvoices: async () => {
        const [rows, fields] = await db.query(`SELECT * FROM ${table} ;`);
        return rows;
      },
    getInvoiceById: async (id) => {
        const [rows, fields] = await db.query(
          `SELECT * FROM ${table} WHERE id = ?`,
          [id]
        );
        return rows;
      },

    getAllInvoicesWithMappedData: async ()=>{
        const [rows, fields] = await db.query(`SELECT id, invoice_id, invoice_name, customer_id, invoice_date, due_date, total_amount, invoice_status,  modified_by, created_by FROM invoices ;`);
        return rows;
    },

    getInvoiceByInvoiceIdWithMappedData: async (id) => {
        const [rows, fields] = await db.query(`SELECT id, invoice_id, invoice_name, customer_id, invoice_date, due_date, total_amount, invoice_status,  modified_by, created_by FROM invoices WHERE invoice_id = ?` , [id]);
        return rows;
    },

    getInvoiceByCondition: async (cond) => {
        const [rows, fields] = await db.query(
          `SELECT * FROM ${table} WHERE ${Object.keys(cond)
            .map((item) => `${item}= '${cond[item]}'`)
            .join(" AND ")}`
        );
        return rows;
      },
    updateInvoiceById: async (id, update) => {
        const [rows] = await db.query(`UPDATE ${table} SET ? WHERE id = ?`, [update,id]
        );
        return rows;
      },
    updateInvoiceByCondition: async (cond, update) => {
        const [rows] = await db.query(
          `UPDATE ${table} SET ? WHERE ${Object.keys(cond)
            .map((item) => `${item} = '${cond[item]}'`)
            .join(" AND ")}`,
          [update]
        );
        return rows;
      },
    deleteInvoiceById: async (id) => {
        const [rows] = await db.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
        return rows;
      },
    deleteInvoiceByCondition: async(cond) =>{
        const [rows] = await db.query(
          `DELETE FROM ${table} WHERE ${Object.keys(cond)
            .map((item) => `${item} = '${cond[item]}'`)
            .join(" AND ")}`
        );
        return rows;
      },
}

module.exports = invoice;