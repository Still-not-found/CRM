const SupplierModel = require('../../models/masters/supplier');
const status = require('../../helpers/Response');
const { validationResult } = require('express-validator');

const supplierController = {
  createSupplier: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      };
      const { supplier, gstin, contactPerson, city, state, country, address, pincode, phone, email, createdBy } = req.body;
      const supplierData = {
        name: supplier,
        city: city,
        state: state,
        country: country,
        address: address,
        pincode: pincode,
        phone: phone,
        email: email,
        contact_person: contactPerson,
        gstin: gstin,
        created_by: createdBy,
        updated_by: createdBy,
      }
      // console.log(supplierData);
      const result = await SupplierModel.createSupplier(supplierData);
      console.log(result);
      if (result.insertId > 0) {
        return status.ResponseStatus(res, 201, "Supplier created successfully");
      }
      return status.ResponseStatus(res, 400, "Failed to create Supplier");
    } catch (error) {
      console.log(error);
      return status.ResponseStatus(res, 500, 'Internal server error', { error: error.message });
    }
  },
  getAllSuppliers: async (req, res) => {
    try {
      const suppliers = await SupplierModel.getAllSuppliers();
      if (suppliers.length > 0) {
        return status.ResponseStatus(res, 200, "List of all Suppliers", suppliers);
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  getAllSuppliersWithMappedData: async (req, res) => {
    try {
      const rows = await SupplierModel.getAllSuppliersWithMappedData();
      if (rows.length > 0) {

        return status.ResponseStatus(res, 200, "List of all Suppliers", rows);
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  getSupplierBySupplierIdWithMappedData: async (req, res) => {
    try {
      const supplier_id = req.params.supplier_id;

      const rows = await SupplierModel.getSupplierBySupplierIdWithMappedData(supplier_id);
      if (rows.length > 0) {
        const {
          id,
          supplier_id,
          name,
          city,
          state,
          country,
          address,
          pincode,
          phone,
          email,
          gstin,
          contact_person,

        } = rows[0];

        const supplier = [
          {
            id,
            supplier_id,
            name,
            city,
            state,
            country,
            address,
            pincode,
            phone,
            email,
            gstin,
            contact_person
          }
        ];

        return status.ResponseStatus(res, 200, `Details of Supplier(${supplier_id})`, supplier);
      }
      return status.ResponseStatus(res, 400, `No data found for ${supplier_id}`);
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  updateSupplierBySupplierId: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      }
      const supplier_id = req.params.supplier_id;
      const { supplier, city, state, country, address, pincode, phone, email, gstin, contactPerson, updatedBy, updatedAt } = req.body;
      const supplierData = {
        name: supplier,
        city: city,
        state: state,
        country: country,
        address: address,
        pincode: pincode,
        phone: phone,
        email: email,
        contact_person: contactPerson,
        gstin: gstin,
        updated_at: updatedAt,
        updated_by: updatedBy,
      }
      const result = await SupplierModel.updateSupplierByCondition({ supplier_id }, supplierData);
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "Supplier updated successfully");
      }
      return status.ResponseStatus(res, 400, `Failed to update Supplier`);
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  deleteSupplierBySupplierId: async (req, res) => {
    try {
      const supplier_id = req.params.supplier_id;
      const result = await SupplierModel.deleteSupplierByCondition({ supplier_id });
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "Supplier deleted successfully");
      }
      return status.ResponseStatus(res, 400, 'Failed to delete Supplier');

    } catch (error) {

      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },
};

module.exports = supplierController;