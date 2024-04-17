const { check } = require("express-validator");

const validation ={
    createManufacturer: [
        check("manufacturer").exists().withMessage("Manufacturer Name is required").notEmpty().withMessage("Manufacturer Name should not be empty"),
        check("createdBy").exists().withMessage("Created By is required").notEmpty().withMessage("Created By should not be empty"),
    ],
    updateManufacturer : [
        check("manufacturer").exists().withMessage("Manufacturer Name is required").notEmpty().withMessage("Manufacturer Name should not be empty"),
        check("modifiedBy").exists().withMessage("Modified By is required").notEmpty().withMessage("Modified By should not be empty"),
    ],
};

module.exports = validation;