const { check } = require("express-validator");

const validation ={
    createConsumable: [
        check("consumable").exists().withMessage("Consumable Name is required").notEmpty().withMessage("Consumable Name should not be empty"),
        check("createdBy").exists().withMessage("Created By is required").notEmpty().withMessage("Created By should not be empty"),
    ],
    updateConsumable : [
        check("consumable").exists().withMessage("Consumable Name is required").notEmpty().withMessage("Consumable Name should not be empty"),
        check("modifiedBy").exists().withMessage("Modified By is required").notEmpty().withMessage("Modified By should not be empty"),
    ],
};

module.exports = validation;