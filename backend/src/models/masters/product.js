const db = require("../../services/db_service");
const table = "products";

const product={
    createProduct: async (productData) =>{
        const [rows] = await db.query(`INSERT INTO ${table} SET ?`,productData);
        return rows;
    },
    getAllProducts: async () => {
        const [rows, fields] = await db.query(`SELECT * FROM ${table} ;`);
        return rows;
      },
    getProductById: async (id) => {
        const [rows, fields] = await db.query(
          `SELECT * FROM ${table} WHERE id = ?`,
          [id]
        );
        return rows;
      },

    getAllProductsWithMappedData: async ()=>{
        const [rows, fields] = await db.query(`SELECT id, product_id, name, description, price, quantity, modified_by, created_by FROM products ;`);
        return rows;
    },

    getProductByProductIdWithMappedData: async (id) => {
        const [rows, fields] = await db.query(`SELECT id, product_id, name, description, price, quantity, modified_by, created_by FROM products WHERE product_id = ?` , [id]);
        return rows;
    },

    getProductByCondition: async (cond) => {
        const [rows, fields] = await db.query(
          `SELECT * FROM ${table} WHERE ${Object.keys(cond)
            .map((item) => `${item}= '${cond[item]}'`)
            .join(" AND ")}`
        );
        return rows;
      },
    updateProductById: async (id, update) => {
        const [rows] = await db.query(`UPDATE ${table} SET ? WHERE id = ?`, [update,id]
        );
        return rows;
      },
    updateProductByCondition: async (cond, update) => {
        const [rows] = await db.query(
          `UPDATE ${table} SET ? WHERE ${Object.keys(cond)
            .map((item) => `${item} = '${cond[item]}'`)
            .join(" AND ")}`,
          [update]
        );
        return rows;
      },
    deleteProductById: async (id) => {
        const [rows] = await db.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
        return rows;
      },
    deleteProductByCondition: async(cond) =>{
        const [rows] = await db.query(
          `DELETE FROM ${table} WHERE ${Object.keys(cond)
            .map((item) => `${item} = '${cond[item]}'`)
            .join(" AND ")}`
        );
        return rows;
      },
}

module.exports = product;