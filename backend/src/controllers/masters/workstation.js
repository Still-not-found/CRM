const WorkstationModel = require('../../models/masters/workstation');
const status = require('../../helpers/Response');
const multer = require("multer");
const qs = require("querystring");
const { validationResult } = require('express-validator');

const workstationController = {
  createWorkstation: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      };
      console.log(req.body);
      const { workstationName, supplier, assignedQty, location, company, orderNumber, purchaseDate, purchaseCost, brand, model, ipAddress, subnetmask, gateway, serialno, installationDate, lastMaintenanceDate, os, ram, storage, cpu, statusId, comments, createdBy } = req.body;
      const workstationData = {
        workstation_name: workstationName,
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
        subnetmask: subnetmask,
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
      // console.log(workstationData);
      const result = await WorkstationModel.createworkstation(workstationData);
      console.log(result);
      if (result.insertId > 0) {
        return status.ResponseStatus(res, 201, "Workstation created successfully");
      }
      return status.ResponseStatus(res, 400, "Failed to create Workstation");
    } catch (error) {
      console.log(error);
      return status.ResponseStatus(res, 500, 'Internal workstation error', { error: error.message });
    }
  },
  getAllWorkstations: async (req, res) => {
    try {
      const workstations = await WorkstationModel.getAllworkstations();
      if (workstations.length > 0) {
        return status.ResponseStatus(res, 200, "List of all Workstations", workstations);
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal workstation error", { error: error.message });
    }
  },

  getAllWorkstationsWithMappedData: async (req, res) => {
    try {
      const rows = await WorkstationModel.getAllworkstationsWithMappedData();
      if (rows.length > 0) {
        return status.ResponseStatus(res, 200, "List of all Workstations", rows);
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal workstation error", { error: error.message });
    }
  },

  getWorkstationByWorkstationIdWithMappedData: async (req, res) => {
    try {
      const workstation_id = req.params.workstation_id;

      const rows = await WorkstationModel.getworkstationByworkstationIdWithMappedData(workstation_id);
      if (rows.length > 0) {
        const {
          id,
          workstation_id,
          workstation_name,
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
          subnetmask,
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

        const workstation = [
          {
            id,
            workstation_id,
            workstation_name,
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
            subnetmask,
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

        return status.ResponseStatus(res, 200, `Details of Workstation(${workstation_id})`, workstation);
      }
      return status.ResponseStatus(res, 400, `No data found for ${workstation_id}`);
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal workstation error", { error: error.message });
    }
  },

  updateWorkstationByWorkstationId: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      }
      const workstation_id = req.params.workstation_id;
      const { workstationName, assignedQty, company, orderNumber, purchaseDate, purchaseCost, brand, model, ipAddress, subnetmask, gateway, serialno, installationDate, lastMaintenanceDate, os, ram, storage, cpu, statusId, comments, updatedBy, supplier, location, } = req.body;
      const workstationData = {
        workstation_name: workstationName,
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
        subnetmask: subnetmask,
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
      const result = await WorkstationModel.updateworkstationByCondition({ workstation_id }, workstationData);
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "Workstation updated successfully");
      }
      return status.ResponseStatus(res, 400, `Failed to update Workstation`);
    } catch (error) {
      console.log(error.message);
      return status.ResponseStatus(res, 500, "Internal workstation error", { error: error.message });
    }
  },

  deleteWorkstationByWorkstationId: async (req, res) => {
    try {
      const workstation_id = req.params.workstation_id;
      const result = await WorkstationModel.deleteworkstationByCondition({ workstation_id });
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "Workstation deleted successfully");
      }
      return status.ResponseStatus(res, 400, 'Failed to delete Workstation');

    } catch (error) {
      //   if(error.errno === 1451){
      //     return status.ResponseStatus(res, 500, "Deletion failed. The selected Workstation is associated with existing data.",{error:error})
      // }
      return status.ResponseStatus(res, 500, "Internal workstation error", { error: error.message });
    }
  },
};

module.exports = workstationController;