const { check } = require("express-validator");

const validation ={
    createComponent: [
        check("component").exists().withMessage("Component Name is required").notEmpty().withMessage("Component Name should not be empty"),
        check("createdBy").exists().withMessage("Created By is required").notEmpty().withMessage("Created By should not be empty"),
    ],
    updateComponent : [
        check("component").exists().withMessage("Component Name is required").notEmpty().withMessage("Component Name should not be empty"),
        check("modifiedBy").exists().withMessage("Modified By is required").notEmpty().withMessage("Modified By should not be empty"),
    ],
};

module.exports = validation;