const { check } = require("express-validator");

const locationValidation = {
  createLocation: [
    check("location")
      .exists()
      .withMessage("Location Name is required")
      .notEmpty()
      .withMessage("Location Name cannot be empty"),
    check("city")
      .exists()
      .withMessage("City is required")
      .notEmpty()
      .withMessage("City cannot be empty"),
    check("country")
      .exists()
      .withMessage("Country is required")
      .notEmpty()
      .withMessage("Country cannot be empty"),
    check("state")
      .exists()
      .withMessage("State is required")
      .notEmpty()
      .withMessage("State cannot be empty"),
    check("createdBy")
      .exists()
      .withMessage("Created By is required")
      .notEmpty()
      .withMessage("Created By cannot be empty"),
  ],
  updateLocation: [
    check("location")
      .exists()
      .withMessage("Location Name is required")
      .notEmpty()
      .withMessage("Location Name cannot be empty"),
    check("city")
      .exists()
      .withMessage("City is required")
      .notEmpty()
      .withMessage("City cannot be empty"),
    check("country")
      .exists()
      .withMessage("Country is required")
      .notEmpty()
      .withMessage("Country cannot be empty"),
    check("state")
      .exists()
      .withMessage("State is required")
      .notEmpty()
      .withMessage("State cannot be empty"),
    check("updatedBy")
      .exists()
      .withMessage("Modified By is required")
      .notEmpty()
      .withMessage("Modified By cannot be empty"),
  ],
};

module.exports = locationValidation;
