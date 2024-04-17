const express = require("express");
const supplierController = require("../../controllers/masters/supplier");
const router = express.Router();
const validation = require("../../middlewares/masters/supplierValidator");

router.route('/supplier_list')
  .get(supplierController.getAllSuppliers);

router
  .route("/suppliers")
  .get(supplierController.getAllSuppliersWithMappedData)
  .post(validation.createSupplier, supplierController.createSupplier);

router
  .route("/suppliers/:supplier_id")
  .get(supplierController.getSupplierBySupplierIdWithMappedData)
  .put(validation.updateSupplier, supplierController.updateSupplierBySupplierId)
  .delete(supplierController.deleteSupplierBySupplierId);

module.exports = router;
