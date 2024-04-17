const NServerModel = require('../../models/masters/nserver');
const status = require('../../helpers/Response');
const multer = require("multer");
const qs = require("querystring");
const { validationResult } = require('express-validator');

const nserverController = {
  createNServer: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      };
      console.log(req.body);
      const { nserverName, warrenty, supplier, assignedQty, location, company, orderNumber, purchaseDate, purchaseCost, brand, model, ipAddress, subnetmask, gateway, serialno, installationDate, lastMaintenanceDate, os, ram, storage, cpu, statusId, comments, createdBy } = req.body;
      const nserverData = {
        nserver_name: nserverName,
        warrenty: warrenty,
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

        operating_system: os,
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
      // console.log(nserverData);
      const result = await NServerModel.createNServer(nserverData);
      console.log(result);
      if (result.insertId > 0) {
        return status.ResponseStatus(res, 201, "NServer created successfully");
      }
      return status.ResponseStatus(res, 400, "Failed to create NServer");
    } catch (error) {
      console.log(error);
      return status.ResponseStatus(res, 500, 'Internal server error', { error: error.message });
    }
  },
  getAllNServers: async (req, res) => {
    try {
      const nservers = await NServerModel.getAllNServers();
      if (nservers.length > 0) {
        return status.ResponseStatus(res, 200, "List of all NServers", nservers);
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  getAllNServersWithMappedData: async (req, res) => {
    try {
      const rows = await NServerModel.getAllNServersWithMappedData();
      if (rows.length > 0) {
        return status.ResponseStatus(res, 200, "List of all NServers", rows);
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  getNServerByNServerIdWithMappedData: async (req, res) => {
    try {
      const nserver_id = req.params.nserver_id;

      const rows = await NServerModel.getNServerByNServerIdWithMappedData(nserver_id);
      if (rows.length > 0) {
        const {
          id,
          warrenty,
          nserver_id,
          nserver_name,
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

          operating_system,
          ram_capacity,
          storage_capacity,
          cpu_model,
          installation_date,
          last_maintenance_date,
          status_id,
          comments,

        } = rows[0];

        const nserver = [
          {
            id,
            nserver_id,
            warrenty,
            nserver_name,
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

            operating_system,
            ram_capacity,
            storage_capacity,
            cpu_model,
            installation_date,
            last_maintenance_date,
            status_id,
            comments,

            // created_by,
          }
        ];

        return status.ResponseStatus(res, 200, `Details of NServer(${nserver_id})`, nserver);
      }
      return status.ResponseStatus(res, 400, `No data found for ${nserver_id}`);
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  updateNServerByNServerId: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      }
      const nserver_id = req.params.nserver_id;
      const { nserverName, warrenty, assignedQty, company, orderNumber, purchaseDate, purchaseCost, brand, model, ipAddress, subnetmask, gateway, firmware, serialno, installationDate, lastMaintenanceDate, os, ram, storage, cpu, statusId, comments, updatedBy, supplier, location, } = req.body;
      const nserverData = {
        nserver_name: nserverName,
        warrenty: warrenty,
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
        operating_system: os,
        ram_capacity: ram,
        storage_capacity: storage,
        cpu_model: cpu,
        installation_date: installationDate,
        last_maintenance_date: lastMaintenanceDate,
        status_id: statusId,
        comments: comments,
        updated_by: updatedBy,
      }
      const result = await NServerModel.updateNServerByCondition({ nserver_id }, nserverData);
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "NServer updated successfully");
      }
      return status.ResponseStatus(res, 400, `Failed to update NServer`);
    } catch (error) {
      console.log(error.message);
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  deleteNServerByNServerId: async (req, res) => {
    try {
      const nserver_id = req.params.nserver_id;
      const result = await NServerModel.deleteNServerByCondition({ nserver_id });
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "NServer deleted successfully");
      }
      return status.ResponseStatus(res, 400, 'Failed to delete NServer');

    } catch (error) {
      //   if(error.errno === 1451){
      //     return status.ResponseStatus(res, 500, "Deletion failed. The selected NServer is associated with existing data.",{error:error})
      // }
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },
};

module.exports = nserverController;