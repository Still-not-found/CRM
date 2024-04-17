const express = require("express");
const licenseController = require("../../controllers/masters/license");
const validation = require("../../middlewares/masters/licenseValidator");
const router = express.Router();

router
  .route("/licenses")
  .get(licenseController.getAllLicenses)
  .post(validation.createLicense, licenseController.createLicense);

router
  .route("/licenses/:license_id")
  .get(licenseController.getLicenseByLicenseId)
  .put(validation.updateLicense, licenseController.updateLicenseByLicenseId)
  .delete(licenseController.deleteLicenseByLicenseId);

module.exports = router;
