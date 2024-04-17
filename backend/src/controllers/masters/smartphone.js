const SmartphoneModel = require('../../models/masters/smartphone');
const status = require('../../helpers/Response');
const multer = require("multer");
const qs = require("querystring");
const { validationResult } = require('express-validator');

const smartphoneController = {
  createSmartphone: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      };
      console.log(req.body);
      const { smartphoneName, warrenty, assignedQty, location, company, orderNumber, purchaseDate, purchaseCost, brand, model, imei, os, storageCapacity, screenSize, color, currentOwner, warrentyexpirydate, serialNumber, statusId, supplier, comments, createdBy } = req.body;
      const smartphoneData = {
        smartphone_name: smartphoneName,
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
        storage_capacity: storageCapacity,
        screen_size: screenSize,
        color: color,
        serial_number: serialNumber,
        warranty_expiry_date: warrentyexpirydate,
        current_owner: currentOwner,
        supplier_id: supplier,
        status_id: statusId,
        comments: comments,
        created_by: createdBy,
        updated_by: createdBy,
        warrenty: warrenty,
      }
      // console.log(smartphoneData);
      const result = await SmartphoneModel.createSmartphone(smartphoneData);
      console.log(result);
      if (result.insertId > 0) {
        return status.ResponseStatus(res, 201, "Smartphone created successfully");
      }
      return status.ResponseStatus(res, 400, "Failed to create Smartphone");
    } catch (error) {
      console.log(error);
      return status.ResponseStatus(res, 500, 'Internal server error', { error: error.message });
    }
  },
  getAllSmartphones: async (req, res) => {
    try {
      const smartphones = await SmartphoneModel.getAllSmartphones();
      if (smartphones.length > 0) {
        return status.ResponseStatus(res, 200, "List of all Smartphones", smartphones);
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  getAllSmartphonesWithMappedData: async (req, res) => {
    try {
      const rows = await SmartphoneModel.getAllSmartphonesWithMappedData();
      if (rows.length > 0) {
        return status.ResponseStatus(res, 200, "List of all Smartphones", rows);
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  getSmartphoneBySmartphoneIdWithMappedData: async (req, res) => {
    try {
      const smartphone_id = req.params.smartphone_id;

      const rows = await SmartphoneModel.getSmartphoneBySmartphoneIdWithMappedData(smartphone_id);
      if (rows.length > 0) {
        const {
          id,
          smartphone_id,
          smartphone_name,
          warranty,
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
          warranty_expiry_date,
          current_owner,
          supplier_id,
          status_id,
          comments,

        } = rows[0];

        const smartphone = [
          {
            id,
            smartphone_id,
            warranty,
            smartphone_name,
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
            warranty_expiry_date,
            current_owner,
            supplier_id,
            status_id,
            comments,

          }
        ];

        return status.ResponseStatus(res, 200, `Details of Smartphone(${smartphone_id})`, smartphone);
      }
      return status.ResponseStatus(res, 400, `No data found for ${smartphone_id}`);
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  updateSmartphoneBySmartphoneId: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      }
      const smartphone_id = req.params.smartphone_id;
      const { smartphoneName, assignedQty, warrenty, location, company, orderNumber, purchaseDate, purchaseCost, brand, model, imei, os, storageCapacity, screenSize, color, currentOwner, warrentyexpirydate, serialNumber, statusId, supplier, comments, updatedBy } = req.body;
      const smartphoneData = {
        smartphone_name: smartphoneName,
        assigned_qty: assignedQty,
        location: location,
        company: company,
        warrenty: warrenty,
        order_number: orderNumber,
        purchase_date: purchaseDate,
        purchase_cost: purchaseCost,
        brand: brand,
        model: model,
        imei: imei,
        os: os,
        storage_capacity: storageCapacity,
        screen_size: screenSize,
        color: color,
        serial_number: serialNumber,
        warranty_expiry_date: warrentyexpirydate,
        current_owner: currentOwner,
        supplier_id: supplier,
        status_id: statusId,
        comments: comments,
        updated_by: updatedBy,
      }
      const result = await SmartphoneModel.updateSmartphoneByCondition({ smartphone_id }, smartphoneData);
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "Smartphone updated successfully");
      }
      return status.ResponseStatus(res, 400, `Failed to update Smartphone`);
    } catch (error) {
      console.log(error.message);
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  deleteSmartphoneBySmartphoneId: async (req, res) => {
    try {
      const smartphone_id = req.params.smartphone_id;
      const result = await SmartphoneModel.deleteSmartphoneByCondition({ smartphone_id });
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "Smartphone deleted successfully");
      }
      return status.ResponseStatus(res, 400, 'Failed to delete Smartphone');

    } catch (error) {
      //   if(error.errno === 1451){
      //     return status.ResponseStatus(res, 500, "Deletion failed. The selected Smartphone is associated with existing data.",{error:error})
      // }
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },
};

module.exports = smartphoneController;