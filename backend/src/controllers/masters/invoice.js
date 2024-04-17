const InvoiceModel = require('../../models/masters/invoice');
const status = require('../../helpers/Response');
const multer = require("multer");
const qs = require("querystring");
const { validationResult } = require('express-validator');
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
const { APP_URL } = process.env;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads/")); // Directory where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Rename files if needed
  }
});

const storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  },
})

const uploadStorage = multer({ storage: storage1 })

const upload = multer({ storage: storage });

const invoiceController = {
  createInvoice: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      };
      // Access uploaded files
      const { files } = req;

      console.log(req.body);
      const { Name, customerId, invoiceDate, dueDate, totalAmount, invoiceStatus, createdBy } = req.body;
      const invoiceData = {
        invoice_name: Name,
        customer_id: customerId,
        invoice_date: invoiceDate,
        due_date: dueDate,
        total_amount: totalAmount,
        invoice_status: invoiceStatus,
        created_by: createdBy,
        modified_by: createdBy,
      }
      // console.log(invoiceData);
      const result = await InvoiceModel.createInvoice(invoiceData);
      console.log(result);
      if (result.insertId > 0) {
        return status.ResponseStatus(res, 201, "Invoice created successfully");
      }
      return status.ResponseStatus(res, 400, "Failed to create Invoice");
    } catch (error) {
      console.log(error);
      return status.ResponseStatus(res, 500, 'Internal server error', { error: error.message });
    }
  },
  getAllInvoices: async (req, res) => {
    try {
      const invoices = await InvoiceModel.getAllInvoices();
      if (invoices.length > 0) {
        return status.ResponseStatus(res, 200, "List of all Invoices", invoices);
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  getAllInvoicesWithMappedData: async (req, res) => {
    try {
      const rows = await InvoiceModel.getAllInvoicesWithMappedData();
      if (rows.length > 0) {
        return status.ResponseStatus(res, 200, "List of all Invoices", rows);
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  getInvoiceByInvoiceIdWithMappedData: async (req, res) => {
    try {
      const invoice_id = req.params.invoice_id;

      const rows = await InvoiceModel.getInvoiceByInvoiceIdWithMappedData(invoice_id);
      if (rows.length > 0) {
        const {
          id,
          invoice_id,
          invoice_name,
        customer_id,
        invoice_date,
        due_date,
        total_amount,
        invoice_status,
          created_by,
          modified_by,
          
        } = rows[0];

        const invoice = [
          {
            id,
          invoice_id,
          invoice_name,
        customer_id,
        invoice_date,
        due_date,
        total_amount,
        invoice_status,
          created_by,
          modified_by,
          }
        ];

        return status.ResponseStatus(res, 200, `Details of Invoice(${invoice_id})`, invoice);
      }
      return status.ResponseStatus(res, 400, `No data found for ${invoice_id}`);
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  updateInvoiceByInvoiceId: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      }
      const invoice_id = req.params.invoice_id;

      // Access uploaded files
      const { files } = req;

      const { Name, customerId, invoiceDate, dueDate, totalAmount, invoiceStatus, modifiedBy } = req.body;
      const invoiceData = {
        invoice_name: Name,
        customer_id: customerId,
        invoice_date: invoiceDate,
        due_date: dueDate,
        total_amount: totalAmount,
        invoice_status: invoiceStatus,
        modified_by: modifiedBy,
      }
      const result = await InvoiceModel.updateInvoiceByCondition({ invoice_id }, invoiceData);
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "Invoice updated successfully");
      }
      return status.ResponseStatus(res, 400, `Failed to update Invoice`);
    } catch (error) {
      console.log(error.message);
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  deleteInvoiceByInvoiceId: async (req, res) => {
    try {
      const invoice_id = req.params.invoice_id;
      const result = await InvoiceModel.deleteInvoiceByCondition({ invoice_id });
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "Invoice deleted successfully");
      }
      return status.ResponseStatus(res, 400, 'Failed to delete Invoice');

    } catch (error) {
      //   if(error.errno === 1451){
      //     return status.ResponseStatus(res, 500, "Deletion failed. The selected Invoice is associated with existing data.",{error:error})
      // }
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  // Controller to handle file upload
  uploadFiles: async (req, res) => {
    try {
      // Access uploaded files
      const { files } = req;

      // Process uploaded files as needed

      return status.ResponseStatus(res, 200, "Files uploaded successfully", { files });
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  }
};

module.exports = invoiceController;