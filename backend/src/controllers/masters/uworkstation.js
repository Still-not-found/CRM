const UWorkstationModel = require('../../models/masters/uworkstation');
const status = require('../../helpers/Response');
const multer = require("multer");
const qs = require("querystring");
const { validationResult } = require('express-validator');

const uworkstationController = {
  createUWorkstation: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      };
      console.log(req.body);
      const { uworkstationName, supplier, assignedQty, location, company, orderNumber, purchaseDate, purchaseCost, brand, model, ipAddress, subnetmask, gateway, serialno, installationDate, lastMaintenanceDate, os, ram, storage, cpu, statusId, comments, createdBy } = req.body;
      const uworkstationData = {
        uworkstation_name: uworkstationName,
        supplier_id: supplier,
        assigned_qty: assignedQty,
        location: location,
        company: company,
        order_number: orderNumber,
        purchase_date: purchaseDate,
        purchase_cost: purchaseCost,
        brand: brand,
        model: model,
        serial_number: serialno,
        ip_address: ipAddress,
        sub_net_mask: subnetmask,
        gateway: gateway,
        os: os,
        ram_capacity: ram,
        storage_capacity: storage,
        cpu_model: cpu,
        installation_date: installationDate,
        last_maintenance_date: lastMaintenanceDate,
        status_id: statusId,
        comments: comments,
        created_by: createdBy,
        updated_by: createdBy,
      }
      // console.log(uworkstationData);
      const result = await UWorkstationModel.createuworkstation(uworkstationData);
      console.log(result);
      if (result.insertId > 0) {
        return status.ResponseStatus(res, 201, "Unaudited Workstation created successfully");
      }
      return status.ResponseStatus(res, 400, "Failed to create Unaudited Workstation");
    } catch (error) {
      console.log(error);
      return status.ResponseStatus(res, 500, 'Internal unaudited workstation error', { error: error.message });
    }
  },
  getAllUWorkstations: async (req, res) => {
    try {
      const uworkstations = await UWorkstationModel.getAlluworkstations();
      if (uworkstations.length > 0) {
        return status.ResponseStatus(res, 200, "List of all UWorkstations", uworkstations);
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal uworkstation error", { error: error.message });
    }
  },

  getAllUWorkstationsWithMappedData: async (req, res) => {
    try {
      const rows = await UWorkstationModel.getAlluworkstationsWithMappedData();
      if (rows.length > 0) {
        return status.ResponseStatus(res, 200, "List of all UWorkstations", rows);
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal uworkstation error", { error: error.message });
    }
  },

  getUWorkstationByUWorkstationIdWithMappedData: async (req, res) => {
    try {
      const uworkstation_id = req.params.uworkstation_id;

      const rows = await UWorkstationModel.getuworkstationByuworkstationIdWithMappedData(uworkstation_id);
      if (rows.length > 0) {
        const {
          id,
          uworkstation_id,
          uworkstation_name,
          supplier_id,
          assigned_qty,
          location,
          company,
          order_number,
          purchase_date,
          purchase_cost,
          brand,
          model,
          serial_number,
          ip_address,
          sub_net_mask,
          gateway,
          os,
          ram_capacity,
          storage_capacity,
          cpu_model,
          installation_date,
          last_maintenance_date,
          status_id,
          comments,

        } = rows[0];

        const uworkstation = [
          {
            id,
            uworkstation_id,
            uworkstation_name,
            supplier_id,
            assigned_qty,
            location,
            company,
            order_number,
            purchase_date,
            purchase_cost,
            brand,
            model,
            serial_number,
            ip_address,
            sub_net_mask,
            gateway,
            os,
            ram_capacity,
            storage_capacity,
            cpu_model,
            installation_date,
            last_maintenance_date,
            status_id,
            comments,
          }
        ];

        return status.ResponseStatus(res, 200, `Details of UWorkstation(${uworkstation_id})`, uworkstation);
      }
      return status.ResponseStatus(res, 400, `No data found for ${uworkstation_id}`);
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal uworkstation error", { error: error.message });
    }
  },

  updateUWorkstationByUWorkstationId: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      }
      const uworkstation_id = req.params.uworkstation_id;
      const { uworkstationName, assignedQty, company, orderNumber, purchaseDate, purchaseCost, brand, model, ipAddress, subnetmask, gateway, serialno, installationDate, lastMaintenanceDate, os, ram, storage, cpu, statusId, comments, updatedBy, supplier, location, } = req.body;
      const uworkstationData = {
        uworkstation_name: uworkstationName,
        supplier_id: supplier,
        assigned_qty: assignedQty,
        location: location,
        company: company,
        order_number: orderNumber,
        purchase_date: purchaseDate,
        purchase_cost: purchaseCost,
        brand: brand,
        model: model,
        serial_number: serialno,
        ip_address: ipAddress,
        sub_net_mask: subnetmask,
        gateway: gateway,
        os: os,
        ram_capacity: ram,
        storage_capacity: storage,
        cpu_model: cpu,
        installation_date: installationDate,
        last_maintenance_date: lastMaintenanceDate,
        status_id: statusId,
        comments: comments,
        updated_by: updatedBy,
      }
      const result = await UWorkstationModel.updateuworkstationByCondition({ uworkstation_id }, uworkstationData);
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "UWorkstation updated successfully");
      }
      return status.ResponseStatus(res, 400, `Failed to update UWorkstation`);
    } catch (error) {
      console.log(error.message);
      return status.ResponseStatus(res, 500, "Internal uworkstation error", { error: error.message });
    }
  },

  deleteUWorkstationByUWorkstationId: async (req, res) => {
    try {
      const uworkstation_id = req.params.uworkstation_id;
      const result = await UWorkstationModel.deleteuworkstationByCondition({ uworkstation_id });
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "UWorkstation deleted successfully");
      }
      return status.ResponseStatus(res, 400, 'Failed to delete UWorkstation');

    } catch (error) {
      //   if(error.errno === 1451){
      //     return status.ResponseStatus(res, 500, "Deletion failed. The selected UWorkstation is associated with existing data.",{error:error})
      // }
      return status.ResponseStatus(res, 500, "Internal uworkstation error", { error: error.message });
    }
  },
};

module.exports = uworkstationController;