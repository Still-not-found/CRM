const { check } = require("express-validator");

const statusValidation = {
  createStatus: [
    check("statusName")
      .exists()
      .withMessage("Status Name is required")
      .notEmpty()
      .withMessage("Status Name cannot be empty"),
    check("statusCode")
      .exists()
      .withMessage("Status Code is required")
      .notEmpty()
      .withMessage("Status Code cannot be empty"),
    check("createdBy")
      .exists()
      .withMessage("Created By is required")
      .notEmpty()
      .withMessage("Created By cannot be empty"),
  ],
  updateStatus: [
    check("statusName")
      .exists()
      .withMessage("Status Name is required")
      .notEmpty()
      .withMessage("Status Name cannot be empty"),
    check("statusCode")
      .exists()
      .withMessage("Status Code is required")
      .notEmpty()
      .withMessage("Status Code cannot be empty"),
    check("updatedBy")
      .exists()
      .withMessage("Modified By is required")
      .notEmpty()
      .withMessage("Modified By cannot be empty"),
  ],
};

module.exports = statusValidation;
