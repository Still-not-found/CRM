const { check } = require("express-validator");

const printerValidation = {
  createPrinter: [
    check("printer")
      .exists()
      .withMessage("Printer Name is required")
      .notEmpty()
      .withMessage("Printer Name cannot be empty"),
  
    check("createdBy")
      .exists()
      .withMessage("Created By is required")
      .notEmpty()
      .withMessage("Created By cannot be empty"),
  ],
  updatePrinter: [
    check("printer")
      .exists()
      .withMessage("Printer Name is required")
      .notEmpty()
      .withMessage("Printer Name cannot be empty"),
    
    check("updatedBy")
      .exists()
      .withMessage("Modified By is required")
      .notEmpty()
      .withMessage("Modified By cannot be empty"),
  ],
};

module.exports = printerValidation;
