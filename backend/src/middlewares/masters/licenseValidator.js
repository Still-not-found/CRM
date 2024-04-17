const { check } = require("express-validator");

const validation ={
    createLicense: [
        check("license").exists().withMessage("License Name is required").notEmpty().withMessage("License Name should not be empty"),
        check("createdBy").exists().withMessage("Created By is required").notEmpty().withMessage("Created By should not be empty"),
    ],
    updateLicense : [
        check("license").exists().withMessage("License Name is required").notEmpty().withMessage("License Name should not be empty"),
        check("modifiedBy").exists().withMessage("Modified By is required").notEmpty().withMessage("Modified By should not be empty"),
    ],
};

module.exports = validation;