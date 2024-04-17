const LicenseModel = require('../../models/masters/license');
const status = require('../../helpers/Response');
const { validationResult } = require('express-validator');

const licenseController = {
  createLicense: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      };
      const { license, city, state, country, address, pincode, createdBy } = req.body;
      const licenseData = {
        name: license,
        city,
        state,
        country,
        address,
        pincode,
        // created_by: createdBy,
        // updated_by: createdBy,
      }
      console.log(licenseData);
      const result = await LicenseModel.createLicense(licenseData);
      console.log(result);
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 201, "License created successfully");
      }
      return status.ResponseStatus(res, 400, "Failed to create License");
    } catch (error) {
      console.log(error);
      console.log(error.message);
      return status.ResponseStatus(res, 500, 'Internal server error', { error: error.message });
    }
  },
  getAllLicenses: async (req, res) => {
    try {
      const licenses = await LicenseModel.getAllLicenses();
      if (licenses.length > 0) {
        return status.ResponseStatus(res, 200, "List of all Licenses", licenses);
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },
  getLicenseByLicenseId: async (req, res) => {
    try {
      const license_id = req.params.license_id;
      const license = await CountryModel.getLicenseByCondition({ license_id });
      if (license.length > 0) {
        return status.ResponseStatus(res, 200, `Details of Licenses(${license_id})`, license);
      }
      return status.ResponseStatus(res, 400, `No data found for ${license_id}`);
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },
  updateLicenseByLicenseId: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      };
      const license_id = req.params.license_id;
      const { license, city, state, country, createdAt, updatedAt } = req.body;
      const licenseData = {
        name: license,
        city: city,
        state: state,
        country: country,
        // updated_at: updatedAt,
        // modified_by: modifiedBy,
      }
      const result = await LicenseModel.updateLicenseByCondition({ license_id }, licenseData);
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "License updated successfully");
      }
      return status.ResponseStatus(res, 400, `Failed to update License`);
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },
  deleteLicenseByLicenseId: async (req, res) => {
    try {
      const license_id = req.params.license_id;
      const result = await LicenseModel.deleteLicenseByCondition({ license_id });
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "License deleted successfully");
      }
      return status.ResponseStatus(res, 400, 'Failed to delete License');
    } catch (error) {
      if (error.errno === 1451) {
        return status.ResponseStatus(res, 500, "Deletion failed. The selected License is associated with existing data.", { error: error })
      }
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  }
};

module.exports = licenseController;