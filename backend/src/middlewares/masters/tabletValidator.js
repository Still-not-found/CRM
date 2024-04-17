const { check } = require("express-validator");

const tabletValidation = {
  createTablet: [
    check("tabletName")
      .exists()
      .withMessage("Tablet Name is required")
      .notEmpty()
      .withMessage("Tablet Name cannot be empty"),
  
    check("createdBy")
      .exists()
      .withMessage("Created By is required")
      .notEmpty()
      .withMessage("Created By cannot be empty"),
  ],
  updateTablet: [
    check("tabletName")
      .exists()
      .withMessage("Tablet Name is required")
      .notEmpty()
      .withMessage("Tablet Name cannot be empty"),
    
    check("updatedBy")
      .exists()
      .withMessage("Modified By is required")
      .notEmpty()
      .withMessage("Modified By cannot be empty"),
  ],
};

module.exports = tabletValidation;
