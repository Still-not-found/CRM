const { check } = require("express-validator");

const accountValidation = {
  createAccount: [
    check("accName")
      .exists()
      .withMessage("Account Name is required")
      .notEmpty()
      .withMessage("Account Name cannot be empty"),
    
    check("createdBy")
      .exists()
      .withMessage("Created By is required")
      .notEmpty()
      .withMessage("Created By cannot be empty"),
  ],
  updateAccount: [
    check("accName")
      .exists()
      .withMessage("Account Name is required")
      .notEmpty()
      .withMessage("Account Name cannot be empty"),
    
    check("modifiedBy")
      .exists()
      .withMessage("Modified By is required")
      .notEmpty()
      .withMessage("Modified By cannot be empty"),
  ],
};

module.exports = accountValidation;
