const { check } = require("express-validator");

const opportunityValidation = {
  createOpportunity: [
    check("Name")
      .exists()
      .withMessage("Opportunity Name is required")
      .notEmpty()
      .withMessage("Opportunity Name cannot be empty"),
    
    check("createdBy")
      .exists()
      .withMessage("Created By is required")
      .notEmpty()
      .withMessage("Created By cannot be empty"),
  ],
  updateOpportunity: [
    check("Name")
      .exists()
      .withMessage("Opportunity Name is required")
      .notEmpty()
      .withMessage("Opportunity Name cannot be empty"),
    
    check("updatedBy")
      .exists()
      .withMessage("Modified By is required")
      .notEmpty()
      .withMessage("Modified By cannot be empty"),
  ],
};

module.exports = opportunityValidation;
