const { check } = require("express-validator");

const leadValidation = {
  createLead: [
    check("leadName")
      .exists()
      .withMessage("Lead Name is required")
      .notEmpty()
      .withMessage("Lead Name cannot be empty"),
    
    check("createdBy")
      .exists()
      .withMessage("Created By is required")
      .notEmpty()
      .withMessage("Created By cannot be empty"),
  ],
  updateLead: [
    check("leadName")
      .exists()
      .withMessage("Lead Name is required")
      .notEmpty()
      .withMessage("Lead Name cannot be empty"),
    
    check("modifiedBy")
      .exists()
      .withMessage("Modified By is required")
      .notEmpty()
      .withMessage("Modified By cannot be empty"),
  ],
};

module.exports = leadValidation;
