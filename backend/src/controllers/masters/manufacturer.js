const ManufacturerModel = require('../../models/masters/manufacturer');
const status = require('../../helpers/Response');
const { validationResult } = require('express-validator');

const manufacturerController = {
  createManufacturer: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      };
      const { manufacturer, city, state, country, address, pincode, createdBy } = req.body;
      const manufacturerData = {
        name: manufacturer,
        city,
        state,
        country,
        address,
        pincode,
        // created_by: createdBy,
        // updated_by: createdBy,
      }
      console.log(manufacturerData);
      const result = await ManufacturerModel.createManufacturer(manufacturerData);
      console.log(result);
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 201, "Manufacturer created successfully");
      }
      return status.ResponseStatus(res, 400, "Failed to create Manufacturer");
    } catch (error) {
      console.log(error);
      console.log(error.message);
      return status.ResponseStatus(res, 500, 'Internal server error', { error: error.message });
    }
  },
  getAllManufacturers: async (req, res) => {
    try {
      const manufacturers = await ManufacturerModel.getAllManufacturers();
      if (manufacturers.length > 0) {
        return status.ResponseStatus(res, 200, "List of all Manufacturers", manufacturers);
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },
  getManufacturerByManufacturerId: async (req, res) => {
    try {
      const manufacturer_id = req.params.manufacturer_id;
      const manufacturer = await CountryModel.getManufacturerByCondition({ manufacturer_id });
      if (manufacturer.length > 0) {
        return status.ResponseStatus(res, 200, `Details of Manufacturers(${manufacturer_id})`, manufacturer);
      }
      return status.ResponseStatus(res, 400, `No data found for ${manufacturer_id}`);
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },
  updateManufacturerByManufacturerId: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      };
      const manufacturer_id = req.params.manufacturer_id;
      const { manufacturer, city, state, country, createdAt, updatedAt } = req.body;
      const manufacturerData = {
        name: manufacturer,
        city: city,
        state: state,
        country: country,
        // updated_at: updatedAt,
        // modified_by: modifiedBy,
      }
      const result = await ManufacturerModel.updateManufacturerByCondition({ manufacturer_id }, manufacturerData);
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "Manufacturer updated successfully");
      }
      return status.ResponseStatus(res, 400, `Failed to update Manufacturer`);
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },
  deleteManufacturerByManufacturerId: async (req, res) => {
    try {
      const manufacturer_id = req.params.manufacturer_id;
      const result = await ManufacturerModel.deleteManufacturerByCondition({ manufacturer_id });
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "Manufacturer deleted successfully");
      }
      return status.ResponseStatus(res, 400, 'Failed to delete Manufacturer');
    } catch (error) {
      if (error.errno === 1451) {
        return status.ResponseStatus(res, 500, "Deletion failed. The selected Manufacturer is associated with existing data.", { error: error })
      }
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  }
};

module.exports = manufacturerController;