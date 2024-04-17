const { check } = require("express-validator");

const workstationValidation = {
  createWorkstation: [
    check("workstationName")
      .exists()
      .withMessage("Workstation Name is required")
      .notEmpty()
      .withMessage("Workstation Name cannot be empty"),
   
    check("createdBy")
      .exists()
      .withMessage("Created By is required")
      .notEmpty()
      .withMessage("Created By cannot be empty"),
  ],
  updateWorkstation: [
    check("workstationName")
      .exists()
      .withMessage("Workstation Name is required")
      .notEmpty()
      .withMessage("Workstation Name cannot be empty"),
    
    check("updatedBy")
      .exists()
      .withMessage("Modified By is required")
      .notEmpty()
      .withMessage("Modified By cannot be empty"),
  ],
};

module.exports = workstationValidation;
