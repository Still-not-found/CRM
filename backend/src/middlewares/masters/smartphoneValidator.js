const { check } = require("express-validator");

const smartphoneValidation = {
  createSmartphone: [
    check("smartphoneName")
      .exists()
      .withMessage("Smartphone Name is required")
      .notEmpty()
      .withMessage("Smartphone Name cannot be empty"),
   
  
    check("createdBy")
      .exists()
      .withMessage("Created By is required")
      .notEmpty()
      .withMessage("Created By cannot be empty"),
  ],
  updateSmartphone: [
    check("smartphoneName")
      .exists()
      .withMessage("Smartphone Name is required")
      .notEmpty()
      .withMessage("Smartphone Name cannot be empty"),
    
    check("updatedBy")
      .exists()
      .withMessage("Modified By is required")
      .notEmpty()
      .withMessage("Modified By cannot be empty"),
  ],
};

module.exports = smartphoneValidation;
