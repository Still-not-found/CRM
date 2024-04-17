const db = require("../../services/db_service");
const table = "accounts";

const account={
    createAccount: async (accountData) =>{
        const [rows] = await db.query(`INSERT INTO ${table} SET ?`,accountData);
        return rows;
    },
    getAllAccounts: async () => {
        const [rows, fields] = await db.query(`SELECT * FROM ${table} ;`);
        return rows;
      },
    getAccountById: async (id) => {
        const [rows, fields] = await db.query(
          `SELECT * FROM ${table} WHERE id = ?`,
          [id]
        );
        return rows;
      },

    getAllAccountsWithMappedData: async ()=>{
        const [rows, fields] = await db.query(`SELECT id, acc_id, name,shippingStreet, shippingCity, shippingState, shippingPincode, shippingCountry, description, industry, annual_revenue, phone, website, type, assigned_user_id, pan_number, gst_number, email, street, city, state, postal_code, country, office_phone, created_by FROM accounts ;`);
        return rows;
    },

    getAccountByAccountIdWithMappedData: async (id) => {
        const [rows, fields] = await db.query(`SELECT id, acc_id, name,shippingStreet, shippingCity, shippingState, shippingPincode, shippingCountry, description, industry, annual_revenue, phone, website, type, assigned_user_id, pan_number, gst_number, email, street, city, state, postal_code, country, office_phone, created_by FROM accounts WHERE acc_id = ?` , [id]);
        return rows;
    },

    getAccountByCondition: async (cond) => {
        const [rows, fields] = await db.query(
          `SELECT * FROM ${table} WHERE ${Object.keys(cond)
            .map((item) => `${item}= '${cond[item]}'`)
            .join(" AND ")}`
        );
        return rows;
      },
    updateAccountById: async (id, update) => {
        const [rows] = await db.query(`UPDATE ${table} SET ? WHERE id = ?`, [update,id]
        );
        return rows;
      },
    updateAccountByCondition: async (cond, update) => {
        const [rows] = await db.query(
          `UPDATE ${table} SET ? WHERE ${Object.keys(cond)
            .map((item) => `${item} = '${cond[item]}'`)
            .join(" AND ")}`,
          [update]
        );
        return rows;
      },
    deleteAccountById: async (id) => {
        const [rows] = await db.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
        return rows;
      },
    deleteAccountByCondition: async(cond) =>{
        const [rows] = await db.query(
          `DELETE FROM ${table} WHERE ${Object.keys(cond)
            .map((item) => `${item} = '${cond[item]}'`)
            .join(" AND ")}`
        );
        return rows;
      },
}

module.exports = account;