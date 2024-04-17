const express = require("express");
const invoiceController = require("../../controllers/masters/invoice");
const router = express.Router();
const multer = require( "multer" );
const validation = require("../../middlewares/masters/invoiceValidator");
const { constants } = require("fs/promises");

// Import the uploadFiles method from the invoice controller
const { uploadFiles } = invoiceController;

const storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/") // Folder to save
},
filename: (req, file, cb) => {
  cb(null, Date.now()+ "_"+file.originalname);
},
})

const uploadStorage = multer({ storage: storage1});

// Multiple files
router.post("/upload/single", uploadStorage.single('file'), (req, res)  => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Send back the filename or any other relevant data
  res.json({ fileName: req.file.filename });

  console.log(req.file)
  return res.send("Single file")
});
router.route('/invoice_list')
  .get(invoiceController.getAllInvoices);
  
router
  .route("/invoices")
  .get(invoiceController.getAllInvoicesWithMappedData)
  .post(validation.createInvoice, invoiceController.createInvoice);

router
  .route("/invoices/:invoice_id")
  .get(invoiceController.getInvoiceByInvoiceIdWithMappedData)
  .put(validation.updateInvoice, invoiceController.updateInvoiceByInvoiceId)
  .delete(invoiceController.deleteInvoiceByInvoiceId);

module.exports = router;
