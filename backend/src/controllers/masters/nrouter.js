const NRouterModel = require('../../models/masters/nrouter');
const CompanyModel = require('../../models/masters/company');
const LocationModel = require('../../models/masters/location');
const StatusModel = require('../../models/masters/status');
const SupplierModel = require('../../models/masters/supplier');

const status = require('../../helpers/Response');
const multer = require("multer");
const qs = require("querystring");
const { validationResult } = require('express-validator');

const nrouterController = {
  createNRouter: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      };
      console.log(req.body);
      const { nrouterName, warrenty, assignedQty, location, company, orderNumber, purchaseDate, purchaseCost, brand, model, ipAddress, subnetmask, gateway, firmware, installationDate, lastMaintenanceDate, statusId, comments, supplier, createdBy } = req.body;
      const nrouterData = {
        nrouter_name: nrouterName,
        assigned_qty: assignedQty,
        location: location,
        company: company,
        supplier_id: supplier,
        order_number: orderNumber,
        purchase_date: purchaseDate,
        purchase_cost: purchaseCost,
        brand: brand,
        model: model,
        ip_address: ipAddress,
        subnetmask: subnetmask,
        gateway: gateway,
        firmware: firmware,
        installation_date: installationDate,
        last_maintenance_date: lastMaintenanceDate,
        status_id: statusId,
        comments: comments,
        created_by: createdBy,
        updated_by: createdBy,
        warrenty: warrenty,
      }
      // console.log(nrouterData);
      const result = await NRouterModel.createNRouter(nrouterData);
      console.log(result);
      if (result.insertId > 0) {
        return status.ResponseStatus(res, 201, "NRouter created successfully");
      }
      return status.ResponseStatus(res, 400, "Failed to create NRouter");
    } catch (error) {
      console.log(error);
      return status.ResponseStatus(res, 500, 'Internal server error', { error: error.message });
    }
  },
  getAllNRouters: async (req, res) => {
    try {
      const nrouters = await NRouterModel.getAllNRouters();
      if (nrouters.length > 0) {
        let nr = [];
        for (let i = 0; i < nrouters.length; i++) {
          const data = nrouters[i];
          const supplier = await SupplierModel.getSupplierByCondition({ supplier_id: data.supplier_id });

          console.log(supplier);
          nr = [...nr, { ...data, supplier: supplier[0] }];
        }
        return status.ResponseStatus(res, 200, "List of all NRouters", nr);
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  getAllNRoutersWithMappedData: async (req, res) => {
    try {
      const rows = await NRouterModel.getAllNRoutersWithMappedData();
      if (rows.length > 0) {
        return status.ResponseStatus(res, 200, "List of all NRouters", rows);
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  getNRouterByNRouterIdWithMappedData: async (req, res) => {
    try {
      const nrouter_id = req.params.nrouter_id;

      const rows = await NRouterModel.getNRouterByNRouterIdWithMappedData(nrouter_id);
      if (rows.length > 0) {
        const {
          id,
          nrouter_id,
          warrenty,
          nrouter_name,
          supplier_id,
          assigned_qty,
          location,
          company,
          order_number,
          purchase_date,
          purchase_cost,
          brand,
          model,
          ip_address,
          subnetmask,
          gateway,
          firmware,
          installation_date,
          last_maintenance_date,
          status_id,
          comments,
          // created_by,

        } = rows[0];

        const nrouter = [
          {
            id,
            nrouter_id,
            warrenty,
            nrouter_name,
            supplier_id,
            assigned_qty,
            location,
            company,
            order_number,
            purchase_date,
            purchase_cost,
            brand,
            model,
            ip_address,
            subnetmask,
            gateway,
            firmware,
            installation_date,
            last_maintenance_date,
            status_id,
            comments,
            // created_by,
          }
        ];

        return status.ResponseStatus(res, 200, `Details of NRouter(${nrouter_id})`, nrouter);
      }
      return status.ResponseStatus(res, 400, `No data found for ${nrouter_id}`);
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  updateNRouterByNRouterId: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      }
      const nrouter_id = req.params.nrouter_id;
      const { nrouterName, assignedQty, warrenty, location, supplier, company, orderNumber, purchaseDate, purchaseCost, brand, model, ipAddress, subnetmask, gateway, firmware, installationDate, lastMaintenanceDate, statusId, comments, updatedBy, updatedAt } = req.body;
      const nrouterData = {
        nrouter_name: nrouterName,
        assigned_qty: assignedQty,
        location: location,
        company: company,
        supplier_id: supplier,
        order_number: orderNumber,
        purchase_date: purchaseDate,
        purchase_cost: purchaseCost,
        brand: brand,
        model: model,
        warrenty: warrenty,
        ip_address: ipAddress,
        subnetmask: subnetmask,
        gateway: gateway,
        firmware: firmware,
        installation_date: installationDate,
        last_maintenance_date: lastMaintenanceDate,
        status_id: statusId,
        comments: comments,
        updated_by: updatedBy,
      }
      const result = await NRouterModel.updateNRouterByCondition({ nrouter_id }, nrouterData);
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "NRouter updated successfully");
      }
      return status.ResponseStatus(res, 400, `Failed to update NRouter`);
    } catch (error) {
      console.log(error.message);
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  deleteNRouterByNRouterId: async (req, res) => {
    try {
      const nrouter_id = req.params.nrouter_id;
      const result = await NRouterModel.deleteNRouterByCondition({ nrouter_id });
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "NRouter deleted successfully");
      }
      return status.ResponseStatus(res, 400, 'Failed to delete NRouter');

    } catch (error) {

      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },
};

module.exports = nrouterController;