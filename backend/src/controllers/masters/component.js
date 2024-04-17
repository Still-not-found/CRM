const ComponentModel = require('../../models/masters/component');
const status = require('../../helpers/Response');
const { validationResult } = require('express-validator');

const componentController = {
  createComponent: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      };
      const { component, city, state, country, address, pincode, createdBy } = req.body;
      const componentData = {
        name: component,
        city,
        state,
        country,
        address,
        pincode,
        // created_by: createdBy,
        // updated_by: createdBy,
      }
      console.log(componentData);
      const result = await ComponentModel.createComponent(componentData);
      console.log(result);
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 201, "Component created successfully");
      }
      return status.ResponseStatus(res, 400, "Failed to create Component");
    } catch (error) {
      console.log(error);
      console.log(error.message);
      return status.ResponseStatus(res, 500, 'Internal server error', { error: error.message });
    }
  },
  getAllComponents: async (req, res) => {
    try {
      const components = await ComponentModel.getAllComponents();
      if (components.length > 0) {
        return status.ResponseStatus(res, 200, "List of all Components", components);
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },
  getComponentByComponentId: async (req, res) => {
    try {
      const component_id = req.params.component_id;
      const component = await CountryModel.getComponentByCondition({ component_id });
      if (component.length > 0) {
        return status.ResponseStatus(res, 200, `Details of Components(${component_id})`, component);
      }
      return status.ResponseStatus(res, 400, `No data found for ${component_id}`);
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },
  updateComponentByComponentId: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      };
      const component_id = req.params.component_id;
      const { component, city, state, country, createdAt, updatedAt } = req.body;
      const componentData = {
        name: component,
        city: city,
        state: state,
        country: country,
        // updated_at: updatedAt,
        // modified_by: modifiedBy,
      }
      const result = await ComponentModel.updateComponentByCondition({ component_id }, componentData);
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "Component updated successfully");
      }
      return status.ResponseStatus(res, 400, `Failed to update Component`);
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },
  deleteComponentByComponentId: async (req, res) => {
    try {
      const component_id = req.params.component_id;
      const result = await ComponentModel.deleteComponentByCondition({ component_id });
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "Component deleted successfully");
      }
      return status.ResponseStatus(res, 400, 'Failed to delete Component');
    } catch (error) {
      if (error.errno === 1451) {
        return status.ResponseStatus(res, 500, "Deletion failed. The selected Component is associated with existing data.", { error: error })
      }
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  }
};

module.exports = componentController;