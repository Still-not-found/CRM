const db = require("../../services/db_service");
const table = "assetes_companies";

const company={
    createCompany: async (companyData={}) =>{
        const [rows] = await db.query(`INSERT INTO ${table} SET ?`,companyData);
        return rows;
    },
    getAllCompanies: async () => {
        const [rows, fields] = await db.query(`SELECT * FROM ${table} ;`);
        return rows;
      },
      getCompanyById: async (id) => {
        const [rows, fields] = await db.query(
          `SELECT * FROM ${table} WHERE id = ?`,
          [id]
        );
        return rows;
      },
      getAllCompaniesWithMappedData: async ()=>{
        const [rows, fields] = await db.query(`SELECT id, company_id, company_name, company_code FROM assetes_companies ;`);
        return rows;
    },

    getCompanyByCompanyIdWithMappedData: async (id) => {
        const [rows, fields] = await db.query(`SELECT id, company_id, company_name, company_code FROM assetes_companies WHERE company_id = ?` , [id]);
        return rows;
    },
      getCompanyByCondition: async (cond) => {
        const [rows, fields] = await db.query(
          `SELECT * FROM ${table} WHERE ${Object.keys(cond)
            .map((item) => `${item}= '${cond[item]}'`)
            .join(" AND ")}`
        );
        return rows;
      },
      updateCompanyById: async (id, update) => {
        const [rows] = await db.query(`UPDATE ${table} SET ? WHERE id = ?`, [
          update,
          id,
        ]);
        return rows;
      },
      updateCompanyByCondition: async (cond, update) => {
        const [rows] = await db.query(
          `UPDATE ${table} SET ? WHERE ${Object.keys(cond)
            .map((item) => `${item} = '${cond[item]}'`)
            .join(" AND ")}`,
          [update]
        );
        return rows;
      },
      deleteCompanyById: async (id) => {
        const [rows] = await db.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
        return rows;
      },
      deleteCompanyByCondition: async(cond) =>{
        const [rows] = await db.query(
          `DELETE FROM ${table} WHERE ${Object.keys(cond)
            .map((item) => `${item} = '${cond[item]}'`)
            .join(" AND ")}`
        );
        return rows;
      },
}

module.exports = company;