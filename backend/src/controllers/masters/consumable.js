const ConsumableModel = require('../../models/masters/consumable');
const status = require('../../helpers/Response');
const { validationResult } = require('express-validator');

const consumableController = {
  createConsumable: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      };
      const { consumable, city, state, country, address, pincode, createdBy } = req.body;
      const consumableData = {
        name: consumable,
        city,
        state,
        country,
        address,
        pincode,
        // created_by: createdBy,
        // updated_by: createdBy,
      }
      console.log(consumableData);
      const result = await ConsumableModel.createConsumable(consumableData);
      console.log(result);
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 201, "Consumable created successfully");
      }
      return status.ResponseStatus(res, 400, "Failed to create Consumable");
    } catch (error) {
      console.log(error);
      console.log(error.message);
      return status.ResponseStatus(res, 500, 'Internal server error', { error: error.message });
    }
  },
  getAllConsumables: async (req, res) => {
    try {
      const consumables = await ConsumableModel.getAllConsumables();
      if (consumables.length > 0) {
        return status.ResponseStatus(res, 200, "List of all Consumables", consumables);
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },
  getConsumableByConsumableId: async (req, res) => {
    try {
      const consumable_id = req.params.consumable_id;
      const consumable = await CountryModel.getConsumableByCondition({ consumable_id });
      if (consumable.length > 0) {
        return status.ResponseStatus(res, 200, `Details of Consumables(${consumable_id})`, consumable);
      }
      return status.ResponseStatus(res, 400, `No data found for ${consumable_id}`);
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },
  updateConsumableByConsumableId: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      };
      const consumable_id = req.params.consumable_id;
      const { consumable, city, state, country, createdAt, updatedAt } = req.body;
      const consumableData = {
        name: consumable,
        city: city,
        state: state,
        country: country,
        // updated_at: updatedAt,
        // modified_by: modifiedBy,
      }
      const result = await ConsumableModel.updateConsumableByCondition({ consumable_id }, consumableData);
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "Consumable updated successfully");
      }
      return status.ResponseStatus(res, 400, `Failed to update Consumable`);
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },
  deleteConsumableByConsumableId: async (req, res) => {
    try {
      const consumable_id = req.params.consumable_id;
      const result = await ConsumableModel.deleteConsumableByCondition({ consumable_id });
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "Consumable deleted successfully");
      }
      return status.ResponseStatus(res, 400, 'Failed to delete Consumable');
    } catch (error) {
      if (error.errno === 1451) {
        return status.ResponseStatus(res, 500, "Deletion failed. The selected Consumable is associated with existing data.", { error: error })
      }
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  }
};

module.exports = consumableController;