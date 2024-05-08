const db = require("../../services/db_service");
const table = "contacts";

const contact={
    createContact: async (contactData) =>{
        const [rows] = await db.query(`INSERT INTO ${table} SET ?`,contactData);
        return rows;
    },
    getAllContacts: async () => {
        const [rows, fields] = await db.query(`SELECT * FROM ${table} ;`);
        return rows;
      },
    getContactById: async (id) => {
        const [rows, fields] = await db.query(
          `SELECT * FROM ${table} WHERE id = ?`,
          [id]
        );
        return rows;
      },

    getAllContactsWithMappedData: async ()=>{
        const [rows, fields] = await db.query(`SELECT id, c_status, middle_name, salutation, designation, gender, company_name, contact_id, account_id, lead_id, first_name, last_name, email, office_phone, job_title, department, mobile, fax, address, city, state, postal_code, country, description, lead_source, reports_to, modified_by, created_by FROM contacts ;`);
        return rows;
    },

    getContactByContactIdWithMappedData: async (id) => {
        const [rows, fields] = await db.query(`SELECT id, c_status, middle_name, salutation, designation, gender, company_name, contact_id, account_id, lead_id, first_name, last_name, email, office_phone, job_title, department, mobile, fax, address, city, state, postal_code, country, description, lead_source, reports_to, modified_by, created_by  FROM contacts WHERE contact_id = ?` , [id]);
        return rows;
    },

    getContactByCondition: async (cond) => {
        const [rows, fields] = await db.query(
          `SELECT * FROM ${table} WHERE ${Object.keys(cond)
            .map((item) => `${item}= '${cond[item]}'`)
            .join(" AND ")}`
        );
        return rows;
      },
    updateContactById: async (id, update) => {
        const [rows] = await db.query(`UPDATE ${table} SET ? WHERE id = ?`, [update,id]
        );
        return rows;
      },
    updateContactByCondition: async (cond, update) => {
        const [rows] = await db.query(
          `UPDATE ${table} SET ? WHERE ${Object.keys(cond)
            .map((item) => `${item} = '${cond[item]}'`)
            .join(" AND ")}`,
          [update]
        );
        return rows;
      },
    deleteContactById: async (id) => {
        const [rows] = await db.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
        return rows;
      },
    deleteContactByCondition: async(cond) =>{
        const [rows] = await db.query(
          `DELETE FROM ${table} WHERE ${Object.keys(cond)
            .map((item) => `${item} = '${cond[item]}'`)
            .join(" AND ")}`
        );
        return rows;
      },
}

module.exports = contact;