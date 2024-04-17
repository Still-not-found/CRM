const { check } = require("express-validator");

const companyValidation = {
  createCompany: [
    check("company")
      .exists()
      .withMessage("Company Name is required")
      .notEmpty()
      .withMessage("Company Name cannot be empty"),
    check("companycode")
      .exists()
      .withMessage("Company Code is required")
      .notEmpty()
      .withMessage("Company Code cannot be empty"),
    check("createdBy")
      .exists()
      .withMessage("Created By is required")
      .notEmpty()
      .withMessage("Created By cannot be empty"),
  ],
  updateCompany: [
    check("company")
      .exists()
      .withMessage("Company Name is required")
      .notEmpty()
      .withMessage("Company Name cannot be empty"),
    check("companycode")
      .exists()
      .withMessage("Company Code is required")
      .notEmpty()
      .withMessage("Company Code cannot be empty"),
    check("updatedBy")
      .exists()
      .withMessage("Modified By is required")
      .notEmpty()
      .withMessage("Modified By cannot be empty"),
  ],
};

module.exports = companyValidation;
