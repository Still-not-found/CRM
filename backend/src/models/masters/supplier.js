const db = require("../../services/db_service");
const table = "assets_supplier";

const supplier={
    createSupplier: async (supplierData) =>{
        const [rows] = await db.query(`INSERT INTO ${table} SET ?`,supplierData);
        return rows;
    },
    getAllSuppliers: async () => {
        const [rows, fields] = await db.query(`SELECT * FROM ${table} ;`);
        return rows;
      },
    getSupplierById: async (id) => {
        const [rows, fields] = await db.query(
          `SELECT * FROM ${table} WHERE id = ?`,
          [id]
        );
        return rows;
      },

    getAllSuppliersWithMappedData: async ()=>{
        const [rows, fields] = await db.query(`SELECT id, supplier_id, gstin, contact_person, name, city, state, country, address, email, phone, pincode FROM assets_supplier ;`);
        return rows;
    },

    getSupplierBySupplierIdWithMappedData: async (id) => {
        const [rows, fields] = await db.query(`SELECT id, supplier_id, gstin, contact_person, name, city, state, country, address, pincode, email, phone FROM assets_supplier WHERE supplier_id = ?` , [id]);
        return rows;
    },

    getSupplierByCondition: async (cond) => {
        const [rows, fields] = await db.query(
          `SELECT * FROM ${table} WHERE ${Object.keys(cond)
            .map((item) => `${item}= '${cond[item]}'`)
            .join(" AND ")}`
        );
        return rows;
      },
    updateSupplierById: async (id, update) => {
        const [rows] = await db.query(`UPDATE ${table} SET ? WHERE id = ?`, [update,id]
        );
        return rows;
      },
    updateSupplierByCondition: async (cond, update) => {
        const [rows] = await db.query(
          `UPDATE ${table} SET ? WHERE ${Object.keys(cond)
            .map((item) => `${item} = '${cond[item]}'`)
            .join(" AND ")}`,
          [update]
        );
        return rows;
      },
    deleteSupplierById: async (id) => {
        const [rows] = await db.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
        return rows;
      },
    deleteSupplierByCondition: async(cond) =>{
        const [rows] = await db.query(
          `DELETE FROM ${table} WHERE ${Object.keys(cond)
            .map((item) => `${item} = '${cond[item]}'`)
            .join(" AND ")}`
        );
        return rows;
      },
}

module.exports = supplier;