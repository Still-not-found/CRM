const jwt = require("jsonwebtoken");
const { APP_KEY } = process.env;
const status = require('../helpers/Response');

const verifyToken = {
    verifyReset: (req, res, next)=>{
        try {
            const {token} = req.params;
            const data = jwt.verify(token, APP_KEY);
            next();
        } catch (error) {
            
        }
    }
};

module.exports = verifyToken;