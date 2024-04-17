const PrinterModel = require('../../models/masters/printer');
const status = require('../../helpers/Response');
const { validationResult } = require('express-validator');

const printerController = {
  createPrinter: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      };
      const { printer, assignedQty, ownedType, purchaseDate, warrenty, location, company, orderNumber, purchaseCost, serialNo, modelNo, manufacturer, department, supplier, ipAddress, macAddress, networkName, printerstatus, inktonerType, createdBy } = req.body;
      const printerData = {
        printer_name: printer,
        owned_type: ownedType,
        purchase_date: purchaseDate,
        assigned_qty: assignedQty,
        location: location,
        company: company,
        order_number: orderNumber,
        purchase_cost: purchaseCost,
        serial_no: serialNo,
        model_no: modelNo,
        manufacturer: manufacturer,
        department: department,
        supplier: supplier,
        ip_address: ipAddress,
        mac_address: macAddress,
        network_name: networkName,
        status_id: printerstatus,
        inktoner_type: inktonerType,
        created_by: createdBy,
        updated_by: createdBy,
        warrenty: warrenty,
      }
      // console.log(printerData);
      const result = await PrinterModel.createPrinter(printerData);
      console.log(result);
      if (result.insertId > 0) {
        return status.ResponseStatus(res, 201, "Printer created successfully");
      }
      return status.ResponseStatus(res, 400, "Failed to create Printer");
    } catch (error) {
      console.log(error);
      return status.ResponseStatus(res, 500, 'Internal server error', { error: error.message });
    }
  },
  getAllPrinters: async (req, res) => {
    try {
      const printers = await PrinterModel.getAllPrinters();
      if (printers.length > 0) {
        return status.ResponseStatus(res, 200, "List of all Printers", printers);
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  getAllPrintersWithMappedData: async (req, res) => {
    try {
      const rows = await PrinterModel.getAllPrintersWithMappedData();
      if (rows.length > 0) {

        return status.ResponseStatus(res, 200, "List of all Printers", rows);
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  getPrinterByPrinterIdWithMappedData: async (req, res) => {
    try {
      const printer_id = req.params.printer_id;

      const rows = await PrinterModel.getPrinterByPrinterIdWithMappedData(printer_id);
      if (rows.length > 0) {
        const {
          id,
          printer_id,
          owned_type,
          warrenty,
          printer_name,
          purchase_date,
          assigned_qty,
          location,
          company,
          order_number,
          purchase_cost,
          serial_no,
          model_no,
          manufacturer,
          department,
          supplier,
          ip_address,
          mac_address,
          network_name,
          status_id,
          inktoner_type,
          created_by,
          updated_by,

        } = rows[0];

        const printer = [
          {
            id,
            printer_id,
            warrenty,
            purchase_date,
            printer_name,
            owned_type,
            assigned_qty,
            location,
            company,
            order_number,
            purchase_cost,
            serial_no,
            model_no,
            manufacturer,
            department,
            supplier,
            ip_address,
            mac_address,
            network_name,
            status_id,
            inktoner_type,
            created_by,
            updated_by,
          }
        ];

        return status.ResponseStatus(res, 200, `Details of Printer(${printer_id})`, printer);
      }
      return status.ResponseStatus(res, 400, `No data found for ${printer_id}`);
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  updatePrinterByPrinterId: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      }
      const printer_id = req.params.printer_id;
      const { printer, warrenty, assignedQty, location, company, orderNumber, purchaseCost, serialNo, modelNo, manufacturer, department, supplier, ipAddress, macAddress, networkName, printerstatus, inktonerType, updatedBy, updatedAt } = req.body;
      const printerData = {
        printer_name: printer,
        assigned_qty: assignedQty,
        owned_type: ownedType,
        location: location,
        company: company,
        purchase_date: purchaseDate,
        order_number: orderNumber,
        purchase_cost: purchaseCost,
        serial_no: serialNo,
        model_no: modelNo,
        manufacturer: manufacturer,
        department: department,
        supplier: supplier,
        ip_address: ipAddress,
        mac_address: macAddress,
        network_name: networkName,
        status_id: printerstatus,
        inktoner_type: inktonerType,
        updated_at: updatedAt,
        updated_by: updatedBy,
        warrenty: warrenty,
      }
      const result = await PrinterModel.updatePrinterByCondition({ printer_id }, printerData);
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "Printer updated successfully");
      }
      return status.ResponseStatus(res, 400, `Failed to update Printer`);
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  deletePrinterByPrinterId: async (req, res) => {
    try {
      const printer_id = req.params.printer_id;
      const result = await PrinterModel.deletePrinterByCondition({ printer_id });
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "Printer deleted successfully");
      }
      return status.ResponseStatus(res, 400, 'Failed to delete Printer');

    } catch (error) {

      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },
};

module.exports = printerController;