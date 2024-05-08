const db = require("../../services/db_service");
const table = "opportunities";

const opportunity={
    createOpportunity: async (opportunityData) =>{
        const [rows] = await db.query(`INSERT INTO ${table} SET ?`,opportunityData);
        return rows;
    },
    getAllOpportunities: async () => {
        const [rows, fields] = await db.query(`SELECT * FROM ${table} ;`);
        return rows;
      },
    getOpportunityById: async (id) => {
        const [rows, fields] = await db.query(
          `SELECT * FROM ${table} WHERE id = ?`,
          [id]
        );
        return rows;
      },

    getAllOpportunitiesWithMappedData: async ()=>{
        const [rows, fields] = await db.query(`SELECT id, opportunities_id, lead_id, user_id, name, description, value, stage, probability, expected_close_date, account_id, opportunity_amount, type, lead_source, sales_stage, assigned_to, updated_by, created_by FROM opportunities ;`);
        return rows;
    },

    getOpportunityByOpportunityIdWithMappedData: async (id) => {
        const [rows, fields] = await db.query(`SELECT id, opportunities_id, lead_id, user_id, name, description, value, stage, probability, expected_close_date, account_id, opportunity_amount, type, lead_source, sales_stage, assigned_to, updated_by, created_by FROM opportunities WHERE opportunities_id = ?` , [id]);
        return rows;
    },

    getOpportunityByCondition: async (cond) => {
        const [rows, fields] = await db.query(
          `SELECT * FROM ${table} WHERE ${Object.keys(cond)
            .map((item) => `${item}= '${cond[item]}'`)
            .join(" AND ")}`
        );
        return rows;
      },
    updateOpportunityById: async (id, update) => {
        const [rows] = await db.query(`UPDATE ${table} SET ? WHERE id = ?`, [update,id]
        );
        return rows;
      },
    updateOpportunityByCondition: async (cond, update) => {
        const [rows] = await db.query(
          `UPDATE ${table} SET ? WHERE ${Object.keys(cond)
            .map((item) => `${item} = '${cond[item]}'`)
            .join(" AND ")}`,
          [update]
        );
        return rows;
      },
    deleteOpportunityById: async (id) => {
        const [rows] = await db.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
        return rows;
      },
    deleteOpportunityByCondition: async(cond) =>{
        const [rows] = await db.query(
          `DELETE FROM ${table} WHERE ${Object.keys(cond)
            .map((item) => `${item} = '${cond[item]}'`)
            .join(" AND ")}`
        );
        return rows;
      },
}

module.exports = opportunity;