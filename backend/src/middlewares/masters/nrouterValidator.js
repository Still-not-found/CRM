const { check } = require("express-validator");

const nrouterValidation = {
  createNRouter: [
    check("nrouterName")
      .exists()
      .withMessage("NRouter Name is required")
      .notEmpty()
      .withMessage("NRouter Name cannot be empty"),
  
    check("createdBy")
      .exists()
      .withMessage("Created By is required")
      .notEmpty()
      .withMessage("Created By cannot be empty"),
  ],
  updateNRouter: [
    check("nrouterName")
      .exists()
      .withMessage("NRouter Name is required")
      .notEmpty()
      .withMessage("NRouter Name cannot be empty"),
    
    check("updatedBy")
      .exists()
      .withMessage("Modified By is required")
      .notEmpty()
      .withMessage("Modified By cannot be empty"),
  ],
};

module.exports = nrouterValidation;
