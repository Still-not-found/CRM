const { check } = require("express-validator");

const uworkstationValidation = {
  createUWorkstation: [
    check("uworkstationName")
      .exists()
      .withMessage("UWorkstation Name is required")
      .notEmpty()
      .withMessage("UWorkstation Name cannot be empty"),
 
  
    check("createdBy")
      .exists()
      .withMessage("Created By is required")
      .notEmpty()
      .withMessage("Created By cannot be empty"),
  ],
  updateUWorkstation: [
    check("uworkstationName")
      .exists()
      .withMessage("UWorkstation Name is required")
      .notEmpty()
      .withMessage("UWorkstation Name cannot be empty"),
    
    check("updatedBy")
      .exists()
      .withMessage("Modified By is required")
      .notEmpty()
      .withMessage("Modified By cannot be empty"),
  ],
};

module.exports = uworkstationValidation;
