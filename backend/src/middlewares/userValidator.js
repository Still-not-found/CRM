const { check } = require("express-validator");
const Role = require("../utils/userRoles");

const validation = {
  createUserSchema: [
    check("firstName").exists().withMessage("First Name is required"),
    check("lastName").exists().withMessage("Last Name is required"),
    check("phone").exists().withMessage("Phone is required"),
    check("userName").exists().withMessage("Username is required"),
    check("email")
      .exists()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Must be a valid email")
      .normalizeEmail(),
    // check("password")
    //   .exists()
    //   .withMessage("Password is required")
    //   .notEmpty()
    //   .isLength({ min: 6 })
    //   .withMessage("Password must contain at least 6 characters"),
    check("role")
      .optional()
      .isIn([Role.SuperAdmin, Role.Admin, Role.User])
      .withMessage("Invalid Role type"),
  ],
  validateLogin: [
    check("email")
      .exists()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Must be a valid email")
      .normalizeEmail(),
    check("password")
      .exists()
      .withMessage("Password is required")
      .notEmpty()
      .withMessage("Password must be filled"),
  ],
};

module.exports = validation;
