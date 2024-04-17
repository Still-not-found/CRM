const db = require("../../services/db_service");
const table = "assetes_location";

const location={
    createLocation: async (locationData) =>{
        const [rows] = await db.query(`INSERT INTO ${table} SET ?`,locationData);
        return rows;
    },
    getAllLocations: async () => {
        const [rows, fields] = await db.query(`SELECT * FROM ${table} ;`);
        return rows;
      },
    getLocationById: async (id) => {
        const [rows, fields] = await db.query(
          `SELECT * FROM ${table} WHERE id = ?`,
          [id]
        );
        return rows;
      },

    getAllLocationsWithMappedData: async ()=>{
        const [rows, fields] = await db.query(`SELECT id, location_id, name, city, state, country, address, pincode FROM assetes_location ;`);
        return rows;
    },

    getLocationByLocationIdWithMappedData: async (id) => {
        const [rows, fields] = await db.query(`SELECT id, location_id, name, city, state, country, address, pincode FROM assetes_location WHERE location_id = ?` , [id]);
        return rows;
    },

    getLocationByCondition: async (cond) => {
        const [rows, fields] = await db.query(
          `SELECT * FROM ${table} WHERE ${Object.keys(cond)
            .map((item) => `${item}= '${cond[item]}'`)
            .join(" AND ")}`
        );
        return rows;
      },
    updateLocationById: async (id, update) => {
        const [rows] = await db.query(`UPDATE ${table} SET ? WHERE id = ?`, [update,id]
        );
        return rows;
      },
    updateLocationByCondition: async (cond, update) => {
        const [rows] = await db.query(
          `UPDATE ${table} SET ? WHERE ${Object.keys(cond)
            .map((item) => `${item} = '${cond[item]}'`)
            .join(" AND ")}`,
          [update]
        );
        return rows;
      },
    deleteLocationById: async (id) => {
        const [rows] = await db.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
        return rows;
      },
    deleteLocationByCondition: async(cond) =>{
        const [rows] = await db.query(
          `DELETE FROM ${table} WHERE ${Object.keys(cond)
            .map((item) => `${item} = '${cond[item]}'`)
            .join(" AND ")}`
        );
        return rows;
      },
}

module.exports = location;