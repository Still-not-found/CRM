const db = require("../services/db_service");
const table = "login_history";

const LoginHistoryModel = {
    createLoginHistory: async (history)=>{
        const [rows] = await db.query(`INSERT INTO ${table} SET ?`, history);
        return rows;
    },
    updateStatusById: async (id,status)=>{
        const [rows] = await db.query(`UPDATE ${table} SET status = ? WHERE id = ?`,[status,id]);
        return rows;
    }
}

module.exports = LoginHistoryModel;