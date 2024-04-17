const AccessPointModel = require('../../models/masters/accesspoint');
const status = require('../../helpers/Response');
const multer = require("multer");
const qs = require("querystring");
const { validationResult } = require('express-validator');

const accesspointController = {
  createAccessPoint: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      };
      console.log(req.body);
      const { accesspointName, warrenty, assignedQty, company, location, statusId, orderNumber, purchaseDate, purchaseCost, manufacturer, ipAddress, subnetmask, gateway, macAddress, firmware, installationDate, lastMaintenanceDate, supplier, comments, createdBy } = req.body;
      const accesspointData = {
        accesspoint_name: accesspointName,
        assigned_qty: assignedQty,
        order_number: orderNumber,
        purchase_date: purchaseDate,
        purchase_cost: purchaseCost,
        manufacturer: manufacturer,
        ip_address: ipAddress,
        subnetmask: subnetmask,
        macaddress: macAddress,
        gateway: gateway,
        firmware: firmware,
        installation_date: installationDate,
        last_maintenance_date: lastMaintenanceDate,
        comments: comments,
        company: company,
        supplier_id: supplier,
        location: location,
        status_id: statusId,
        created_by: createdBy,
        updated_by: createdBy,
        warrenty: warrenty,
      }
      // console.log(accesspointData);
      const result = await AccessPointModel.createAccesspoint(accesspointData);
      console.log(result);
      if (result.insertId > 0) {
        return status.ResponseStatus(res, 201, "AccessPoint created successfully");
      }
      return status.ResponseStatus(res, 400, "Failed to create AccessPoint");
    } catch (error) {
      console.log(error);
      return status.ResponseStatus(res, 500, 'Internal server error', { error: error.message });
    }
  },
  getAllAccessPoints: async (req, res) => {
    try {
      const accesspoints = await AccessPointModel.getAllAccesspoints();
      if (accesspoints.length > 0) {
        return status.ResponseStatus(res, 200, "List of all AccessPoints", accesspoints);
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  getAllAccessPointsWithMappedData: async (req, res) => {
    try {
      const rows = await AccessPointModel.getAllAccesspointsWithMappedData();
      if (rows.length > 0) {
        return status.ResponseStatus(res, 200, "List of all AccessPoints", rows);
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  getAccessPointByAccessPointIdWithMappedData: async (req, res) => {
    try {
      const accesspoint_id = req.params.accesspoint_id;

      const rows = await AccessPointModel.getAccesspointByAccesspointIdWithMappedData(accesspoint_id);
      if (rows.length > 0) {
        const {
          id,
          warrenty,
          accesspoint_id,
          accesspoint_name,
          assigned_qty,
          order_number,
          purchase_date,
          purchase_cost,
          manufacturer,
          ip_address,
          subnetmask,
          macaddress,
          gateway,
          firmware,
          installation_date,
          last_maintenance_date,
          comments,
          company,
          supplier_id,
          location,
          status_id,
          // created_by,

        } = rows[0];

        const accesspoint = [
          {
            id,
            warrenty,
            accesspoint_id,
            accesspoint_name,
            assigned_qty,
            order_number,
            purchase_date,
            purchase_cost,
            manufacturer,
            ip_address,
            subnetmask,
            macaddress,
            gateway,
            firmware,
            installation_date,
            last_maintenance_date,
            comments,
            company,
            supplier_id,
            location,
            status_id,
            // created_by,
          }
        ];

        return status.ResponseStatus(res, 200, `Details of AccessPoint(${accesspoint_id})`, accesspoint);
      }
      return status.ResponseStatus(res, 400, `No data found for ${accesspoint_id}`);
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  updateAccessPointByAccessPointId: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      }
      const accesspoint_id = req.params.accesspoint_id;
      const { accesspointName, warrenty, assignedQty, company, supplier, location, statusId, orderNumber, purchaseDate, purchaseCost, manufacturer, ipAddress, subnetmask, gateway, macAddress, firmware, installationDate, lastMaintenanceDate, comments, updatedAt } = req.body;
      const accesspointData = {
        accesspoint_name: accesspointName,
        assigned_qty: assignedQty,
        order_number: orderNumber,
        purchase_date: purchaseDate,
        purchase_cost: purchaseCost,
        manufacturer: manufacturer,
        ip_address: ipAddress,
        subnetmask: subnetmask,
        macaddress: macAddress,
        gateway: gateway,
        firmware: firmware,
        installation_date: installationDate,
        last_maintenance_date: lastMaintenanceDate,
        comments: comments,
        company: company,
        supplier_id: supplier,
        location: location,
        status_id: statusId,
        warrenty: warrenty,
      }
      const result = await AccessPointModel.updateAccesspointByCondition({ accesspoint_id }, accesspointData);
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "AccessPoint updated successfully");
      }
      return status.ResponseStatus(res, 400, `Failed to update AccessPoint`);
    } catch (error) {
      console.log(error.message);
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  deleteAccessPointByAccessPointId: async (req, res) => {
    try {
      const accesspoint_id = req.params.accesspoint_id;
      const result = await AccessPointModel.deleteAccesspointByCondition({ accesspoint_id });
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "AccessPoint deleted successfully");
      }
      return status.ResponseStatus(res, 400, 'Failed to delete AccessPoint');

    } catch (error) {
      //   if(error.errno === 1451){
      //     return status.ResponseStatus(res, 500, "Deletion failed. The selected AccessPoint is associated with existing data.",{error:error})
      // }
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },
};

module.exports = accesspointController;