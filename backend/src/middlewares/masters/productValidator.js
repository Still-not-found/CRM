const { check } = require("express-validator");

const productValidation = {
  createProduct: [
    check("Name")
      .exists()
      .withMessage("Product Name is required")
      .notEmpty()
      .withMessage("Product Name cannot be empty"),
    
    check("createdBy")
      .exists()
      .withMessage("Created By is required")
      .notEmpty()
      .withMessage("Created By cannot be empty"),
  ],
  updateProduct: [
    check("Name")
      .exists()
      .withMessage("Product Name is required")
      .notEmpty()
      .withMessage("Product Name cannot be empty"),
    
    check("modifiedBy")
      .exists()
      .withMessage("Modified By is required")
      .notEmpty()
      .withMessage("Modified By cannot be empty"),
  ],
};

module.exports = productValidation;
