const { check } = require("express-validator");

const accesspointValidation = {
  createAccesspoint: [
    check("accesspointName")
      .exists()
      .withMessage("Accesspoint Name is required")
      .notEmpty()
      .withMessage("Accesspoint Name cannot be empty"),
    
  
    check("createdBy")
      .exists()
      .withMessage("Created By is required")
      .notEmpty()
      .withMessage("Created By cannot be empty"),
  ],
  updateAccesspoint: [
    check("accesspointName")
      .exists()
      .withMessage("Accesspoint Name is required")
      .notEmpty()
      .withMessage("Accesspoint Name cannot be empty"),
    
    check("updatedBy")
      .exists()
      .withMessage("Modified By is required")
      .notEmpty()
      .withMessage("Modified By cannot be empty"),
  ],
};

module.exports = accesspointValidation;
