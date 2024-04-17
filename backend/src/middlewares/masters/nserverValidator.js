const { check } = require("express-validator");

const nserverValidation = {
  createNServer: [
    check("nserverName")
      .exists()
      .withMessage("NServer Name is required")
      .notEmpty()
      .withMessage("NServer Name cannot be empty"),
    
    check("createdBy")
      .exists()
      .withMessage("Created By is required")
      .notEmpty()
      .withMessage("Created By cannot be empty"),
  ],
  updateNServer: [
    check("nserverName")
      .exists()
      .withMessage("NServer Name is required")
      .notEmpty()
      .withMessage("NServer Name cannot be empty"),
    
    check("updatedBy")
      .exists()
      .withMessage("Modified By is required")
      .notEmpty()
      .withMessage("Modified By cannot be empty"),
  ],
};

module.exports = nserverValidation;
