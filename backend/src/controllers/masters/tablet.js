const TabletModel = require('../../models/masters/tablet');
const status = require('../../helpers/Response');
const multer = require("multer");
const qs = require("querystring");
const { validationResult } = require('express-validator');

const tabletController = {
  createTablet: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      };
      console.log(req.body);
      const { tabletName, warrenty, assignedQty, location, company, orderNumber, purchaseDate, purchaseCost, brand, model, imei, os, storageCapacity, screenSize, color, currentOwner, warrentyexpirydate, serialNumber, statusId, supplier, comments, createdBy } = req.body;
      const tabletData = {
        tablet_name: tabletName,
        assigned_qty: assignedQty,
        location: location,
        company: company,
        order_number: orderNumber,
        purchase_date: purchaseDate,
        purchase_cost: purchaseCost,
        brand: brand,
        model: model,
        imei: imei,
        os: os,
        warrenty: warrenty,
        storage_capacity: storageCapacity,
        screen_size: screenSize,
        color: color,
        serial_number: serialNumber,
        warrenty_expiry_date: warrentyexpirydate,
        current_owner: currentOwner,
        supplier_id: supplier,
        status_id: statusId,
        comments: comments,
        created_by: createdBy,
        updated_by: createdBy,
      }
      // console.log(tabletData);
      const result = await TabletModel.createTablet(tabletData);
      console.log(result);
      if (result.insertId > 0) {
        return status.ResponseStatus(res, 201, "Tablet created successfully");
      }
      return status.ResponseStatus(res, 400, "Failed to create Tablet");
    } catch (error) {
      console.log(error);
      return status.ResponseStatus(res, 500, 'Internal server error', { error: error.message });
    }
  },
  getAllTablets: async (req, res) => {
    try {
      const tablets = await TabletModel.getAllTablets();
      if (tablets.length > 0) {
        return status.ResponseStatus(res, 200, "List of all Tablets", tablets);
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  getAllTabletsWithMappedData: async (req, res) => {
    try {
      const rows = await TabletModel.getAllTabletsWithMappedData();
      if (rows.length > 0) {
        return status.ResponseStatus(res, 200, "List of all Tablets", rows);
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  getTabletByTabletIdWithMappedData: async (req, res) => {
    try {
      const tablet_id = req.params.tablet_id;

      const rows = await TabletModel.getTabletByTabletIdWithMappedData(tablet_id);
      if (rows.length > 0) {
        const {
          id,
          tablet_id,
          tablet_name,
          warrenty,
          assigned_qty,
          location,
          company,
          order_number,
          purchase_date,
          purchase_cost,
          brand,
          model,
          imei,
          os,
          storage_capacity,
          screen_size,
          color,
          serial_number,
          warrenty_expiry_date,
          current_owner,
          supplier_id,
          status_id,
          comments,

        } = rows[0];

        const tablet = [
          {
            id,
            tablet_id,
            tablet_name,
            warrenty,
            assigned_qty,
            location,
            company,
            order_number,
            purchase_date,
            purchase_cost,
            brand,
            model,
            imei,
            os,
            storage_capacity,
            screen_size,
            color,
            serial_number,
            warrenty_expiry_date,
            current_owner,
            supplier_id,
            status_id,
            comments,

          }
        ];

        return status.ResponseStatus(res, 200, `Details of Tablet(${tablet_id})`, tablet);
      }
      return status.ResponseStatus(res, 400, `No data found for ${tablet_id}`);
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  updateTabletByTabletId: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      }
      const tablet_id = req.params.tablet_id;
      const { tabletName, assignedQty, warrenty, location, company, orderNumber, purchaseDate, purchaseCost, brand, model, imei, os, storageCapacity, screenSize, color, currentOwner, warrentyexpirydate, serialNumber, statusId, supplier, comments, updatedBy } = req.body;
      const tabletData = {
        tablet_name: tabletName,
        assigned_qty: assignedQty,
        location: location,
        company: company,
        order_number: orderNumber,
        purchase_date: purchaseDate,
        purchase_cost: purchaseCost,
        brand: brand,
        model: model,
        imei: imei,
        os: os,
        warrenty: warrenty,
        storage_capacity: storageCapacity,
        screen_size: screenSize,
        color: color,
        serial_number: serialNumber,
        warrenty_expiry_date: warrentyexpirydate,
        current_owner: currentOwner,
        supplier_id: supplier,
        status_id: statusId,
        comments: comments,
        updated_by: updatedBy,
      }
      const result = await TabletModel.updateTabletByCondition({ tablet_id }, tabletData);
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "Tablet updated successfully");
      }
      return status.ResponseStatus(res, 400, `Failed to update Tablet`);
    } catch (error) {
      console.log(error.message);
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  deleteTabletByTabletId: async (req, res) => {
    try {
      const tablet_id = req.params.tablet_id;
      const result = await TabletModel.deleteTabletByCondition({ tablet_id });
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "Tablet deleted successfully");
      }
      return status.ResponseStatus(res, 400, 'Failed to delete Tablet');

    } catch (error) {
      //   if(error.errno === 1451){
      //     return status.ResponseStatus(res, 500, "Deletion failed. The selected Tablet is associated with existing data.",{error:error})
      // }
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },
};

module.exports = tabletController;