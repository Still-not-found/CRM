const StatusModel = require('../../models/masters/status');
const status = require('../../helpers/Response');
const { validationResult } = require('express-validator');

const statusController = {
  createStatus: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      };
      const { statusName, statusCode, createdBy } = req.body;
      const statusData = {
        status_name: statusName,
        status_code: statusCode,
        created_by: createdBy,
        updated_by: createdBy,
      }
      // console.log(statusData);
      const result = await StatusModel.createStatus(statusData);
      console.log(result);
      if (result.insertId > 0) {
        return status.ResponseStatus(res, 201, "Status created successfully");
      }
      return status.ResponseStatus(res, 400, "Failed to create Status");
    } catch (error) {
      console.log(error);
      return status.ResponseStatus(res, 500, 'Internal server error', { error: error.message });
    }
  },
  getAllStatus: async (req, res) => {
    try {
      const status = await StatusModel.getAllStatus();
      if (status.length > 0) {
        return status.ResponseStatus(res, 200, "List of all Status", status);
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  getAllStatusWithMappedData: async (req, res) => {
    try {
      const rows = await StatusModel.getAllStatusWithMappedData();
      if (rows.length > 0) {

        return status.ResponseStatus(res, 200, "List of all Status", rows);
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  getStatusByStatusIdWithMappedData: async (req, res) => {
    try {
      const status_id = req.params.status_id;

      const rows = await StatusModel.getStatusByStatusIdWithMappedData(status_id);
      if (rows.length > 0) {
        const {
          id,
          status_id,
          status_name,
          status_code,
        } = rows[0];

        const statusData = [
          {
            id,
            status_id,
            status_name,
            status_code,
          }
        ];

        return status.ResponseStatus(res, 200, `Details of Status(${status_id})`, statusData);
      }
      return status.ResponseStatus(res, 400, `No data found for ${status_id}`);
    } catch (error) {
      console.log(error);
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  updateStatusByStatusId: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      };
      const status_id = req.params.status_id;
      const { statusName, statusCode, updatedBy } = req.body;
      const statusData = {
        status_name: statusName,
        status_code: statusCode,
        updated_by: updatedBy,
      }
      const result = await StatusModel.updateStatusByCondition({ status_id }, statusData);
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "Status updated successfully");
      }
      return status.ResponseStatus(res, 400, `Failed to update Status`);
    } catch (error) {
      console.log(error);
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },
  deleteStatusByStatusId: async (req, res) => {
    try {
      const status_id = req.params.status_id;
      const result = await StatusModel.deleteStatusByCondition({ status_id });
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "Status deleted successfully");
      }
      return status.ResponseStatus(res, 400, 'Failed to delete Status');
    } catch (error) {
      //   if(error.errno === 1451){
      //     return status.ResponseStatus(res, 500, "Deletion failed. The selected Status is associated with existing data.",{error:error})
      // }
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  }
};

module.exports = statusController;