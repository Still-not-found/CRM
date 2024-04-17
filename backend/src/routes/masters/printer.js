const express = require("express");
const printerController = require("../../controllers/masters/printer");
const router = express.Router();
const validation = require("../../middlewares/masters/printerValidator");

router.route('/printer_list')
  .get(printerController.getAllPrinters);

router
  .route("/printers")
  .get(printerController.getAllPrintersWithMappedData)
  .post(validation.createPrinter, printerController.createPrinter);

router
  .route("/printers/:printer_id")
  .get(printerController.getPrinterByPrinterIdWithMappedData)
  .put(validation.updatePrinter, printerController.updatePrinterByPrinterId)
  .delete(printerController.deletePrinterByPrinterId);

module.exports = router;
