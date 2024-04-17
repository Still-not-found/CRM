const { check } = require("express-validator");

const supplierValidation = {
  createSupplier: [
    check("supplier")
      .exists()
      .withMessage("Supplier Name is required")
      .notEmpty()
      .withMessage("Supplier Name cannot be empty"),
   
    check("createdBy")
      .exists()
      .withMessage("Created By is required")
      .notEmpty()
      .withMessage("Created By cannot be empty"),
  ],
  updateSupplier: [
    check("supplier")
      .exists()
      .withMessage("Supplier Name is required")
      .notEmpty()
      .withMessage("Supplier Name cannot be empty"),
    
    check("updatedBy")
      .exists()
      .withMessage("Modified By is required")
      .notEmpty()
      .withMessage("Modified By cannot be empty"),
  ],
};

module.exports = supplierValidation;
