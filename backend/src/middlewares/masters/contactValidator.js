const { check } = require("express-validator");

const contactValidation = {
  createContact: [
    check("contactName")
      .exists()
      .withMessage("Contact Name is required")
      .notEmpty()
      .withMessage("Contact Name cannot be empty"),
    
    check("createdBy")
      .exists()
      .withMessage("Created By is required")
      .notEmpty()
      .withMessage("Created By cannot be empty"),
  ],
  updateContact: [
    check("contactName")
      .exists()
      .withMessage("Contact Name is required")
      .notEmpty()
      .withMessage("Contact Name cannot be empty"),
    
    check("modifiedBy")
      .exists()
      .withMessage("Modified By is required")
      .notEmpty()
      .withMessage("Modified By cannot be empty"),
  ],
};

module.exports = contactValidation;
