const { check } = require("express-validator");

const computerValidation = {
  createComputer: [
    check("computerName")
      .exists()
      .withMessage("Computer Name is required")
      .notEmpty()
      .withMessage("Computer Name cannot be empty"),
    
    check("createdBy")
      .exists()
      .withMessage("Created By is required")
      .notEmpty()
      .withMessage("Created By cannot be empty"),
  ],
  updateComputer: [
    check("computerName")
      .exists()
      .withMessage("Computer Name is required")
      .notEmpty()
      .withMessage("Computer Name cannot be empty"),
    
    check("updatedBy")
      .exists()
      .withMessage("Modified By is required")
      .notEmpty()
      .withMessage("Modified By cannot be empty"),
  ],
};

module.exports = computerValidation;
