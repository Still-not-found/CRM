const { check } = require("express-validator");

const invoiceValidation = {
  createInvoice: [
    check("Name")
      .exists()
      .withMessage("Invoice Name is required")
      .notEmpty()
      .withMessage("Invoice Name cannot be empty"),
    
    check("createdBy")
      .exists()
      .withMessage("Created By is required")
      .notEmpty()
      .withMessage("Created By cannot be empty"),
  ],
  updateInvoice: [
    check("Name")
      .exists()
      .withMessage("Invoice Name is required")
      .notEmpty()
      .withMessage("Invoice Name cannot be empty"),
    
    check("modifiedBy")
      .exists()
      .withMessage("Modified By is required")
      .notEmpty()
      .withMessage("Modified By cannot be empty"),
  ],
};

module.exports = invoiceValidation;
