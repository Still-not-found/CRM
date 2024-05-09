const db = require("../../services/db_service");
const table = "leads";

const lead={
    createLead: async (leadData) =>{
        const [rows] = await db.query(`INSERT INTO ${table} SET ?`,leadData);
        return rows;
    },
    getAllLeads: async () => {
        const [rows, fields] = await db.query(`SELECT * FROM ${table} ;`);
        return rows;
      },
    getLeadById: async (id) => {
        const [rows, fields] = await db.query(
          `SELECT * FROM ${table} WHERE id = ?`,
          [id]
        );
        return rows;
      },

    getAllLeadsWithMappedData: async ()=>{
        const [rows, fields] = await db.query(`SELECT id, salutation, shipping_city, shipping_country, shipping_state, shipping_pincode, gender, series, lead_type, request_type, lead_id, title, description, lead_status, source, interest_level, first_name, last_name, office_phone, job_title, mobile, fax, department, account_name, email, lead_source, status_description, opportunity_amount, lead_source_description, referred_by, assigned_to, address, city, state, postal_code, country, shipping_address, modified_by, created_by FROM leads ;`);
        return rows;
    },

    getLeadByLeadIdWithMappedData: async (id) => {
        const [rows, fields] = await db.query(`SELECT id, salutation, shipping_city, shipping_country, shipping_state, shipping_pincode, gender, series, lead_type, request_type, lead_id, title, description, lead_status, source, interest_level, first_name, last_name, office_phone, job_title, mobile, fax, department, account_name, email, lead_source, status_description, opportunity_amount, lead_source_description, referred_by, assigned_to, address, city, state, postal_code, country, shipping_address, modified_by, created_by FROM leads WHERE lead_id = ?` , [id]);
        return rows;
    },

    getLeadByCondition: async (cond) => {
        const [rows, fields] = await db.query(
          `SELECT * FROM ${table} WHERE ${Object.keys(cond)
            .map((item) => `${item}= '${cond[item]}'`)
            .join(" AND ")}`
        );
        return rows;
      },
    updateLeadById: async (id, update) => {
        const [rows] = await db.query(`UPDATE ${table} SET ? WHERE id = ?`, [update,id]
        );
        return rows;
      },
    updateLeadByCondition: async (cond, update) => {
        const [rows] = await db.query(
          `UPDATE ${table} SET ? WHERE ${Object.keys(cond)
            .map((item) => `${item} = '${cond[item]}'`)
            .join(" AND ")}`,
          [update]
        );
        return rows;
      },
    deleteLeadById: async (id) => {
        const [rows] = await db.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
        return rows;
      },
    deleteLeadByCondition: async(cond) =>{
        const [rows] = await db.query(
          `DELETE FROM ${table} WHERE ${Object.keys(cond)
            .map((item) => `${item} = '${cond[item]}'`)
            .join(" AND ")}`
        );
        return rows;
      },
}

module.exports = lead;