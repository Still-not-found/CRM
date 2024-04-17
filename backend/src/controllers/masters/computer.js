const ComputerModel = require('../../models/masters/computer');
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

const computerController = {
  createComputer: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      };

      // Access uploaded files
      const { files } = req;

      console.log(req.body);
      const { computerName, invoice, po, warrenty, assettag, purchasecost, serial, purchasedate, assignedto, hostname, osname, osversion, osmanufacturer, osbuildtype, osconfiguration, registeredowner, productid, originalinstalldate, systemmanufacturer, systemmodel, processor, domain, sophos, sapphire, systemtype, biosversion, windowsdirectory, systemdirectory, systemlocale, timezone, totalphysicalram, virtualrammax, virtualramavailable, installedsoftware, ordernumber, billedentity, assignedentity, supplier, location, assetStatus, createdBy } = req.body;
      const computerData = {
        name: computerName,
        asset_tag: assettag,
        serial: serial,
        // assigned_to: assignedto,
        host_name: hostname,
        purchase_date: purchasedate,
        purchase_cost: purchasecost,
        os_name: osname,
        os_version: osversion,
        os_manufacturer: osmanufacturer,
        os_build_type: osbuildtype,
        os_configuration: osconfiguration,
        registered_owner: registeredowner,
        product_id: productid,
        original_install_date: originalinstalldate,
        system_manufacturer: systemmanufacturer,
        system_model: systemmodel,
        processor: processor,
        domain: domain,
        sophos: sophos,
        sapphire: sapphire,
        system_type: systemtype,
        bios_version: biosversion,
        windows_directory: windowsdirectory,
        system_directory: systemdirectory,
        system_locale: systemlocale,
        time_zone: timezone,
        total_physical_ram: totalphysicalram,
        virtual_ram_max: virtualrammax,
        virtual_ram_available: virtualramavailable,
        installed_software: installedsoftware,
        order_number: ordernumber,
        billed_entity: billedentity,
        assigned_entity: assignedentity,
        supplier_id: supplier,
        location_id: location,
        status_id: assetStatus,
        warrenty: warrenty,
        created_by: createdBy,
        updated_by: createdBy,
        invoice: invoice,
        po: po,
      }
      // console.log(computerData);
      const result = await ComputerModel.createComputer(computerData);
      console.log(result);
      if (result.insertId > 0) {
        return status.ResponseStatus(res, 201, "Computer created successfully");
      }
      return status.ResponseStatus(res, 400, "Failed to create Computer");
    } catch (error) {
      console.log(error);
      return status.ResponseStatus(res, 500, 'Internal server error', { error: error.message });
    }
  },
  getAllComputers: async (req, res) => {
    try {
      const computers = await ComputerModel.getAllComputers();
      if (computers.length > 0) {
        return status.ResponseStatus(res, 200, "List of all Computers", computers);
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  getAllComputersWithMappedData: async (req, res) => {
    try {
      const rows = await ComputerModel.getAllComputersWithMappedData();
      if (rows.length > 0) {
        return status.ResponseStatus(res, 200, "List of all Computers", rows);
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  getComputerByComputerIdWithMappedData: async (req, res) => {
    try {
      const computer_id = req.params.computer_id;

      const rows = await ComputerModel.getComputerByComputerIdWithMappedData(computer_id);
      if (rows.length > 0) {
        const {
          id,
          computer_id,
          invoice,
          po,
          warrenty,
          name,
          asset_tag,
          serial,
          purchase_cost,
          // assigned_to,
          host_name,
          os_name,
          os_version,
          os_manufacturer,
          os_build_type,
          os_configuration,
          registered_owner,
          product_id,
          purchase_date,
          original_install_date,
          system_manufacturer,
          system_model,
          processor,
          domain,
          sophos,
          sapphire,
          system_type,
          bios_version,
          windows_directory,
          system_directory,
          system_locale,
          time_zone,
          total_physical_ram,
          virtual_ram_max,
          virtual_ram_available,
          installed_software,
          order_number,
          billed_entity,
          assigned_entity,
          supplier_id,
          location_id,
          status_id,
          // created_by,

        } = rows[0];

        const computer = [
          {
            id,
            computer_id,
            invoice,
            po,
            warrenty,
            name,
            asset_tag,
            serial,
            purchase_cost,
            purchase_date,
            // assigned_to,
            host_name,
            os_name,
            os_version,
            os_manufacturer,
            os_build_type,
            os_configuration,
            registered_owner,
            product_id,
            original_install_date,
            system_manufacturer,
            system_model,
            processor,
            domain,
            sophos,
            sapphire,
            system_type,
            bios_version,
            windows_directory,
            system_directory,
            system_locale,
            time_zone,
            total_physical_ram,
            virtual_ram_max,
            virtual_ram_available,
            installed_software,
            order_number,
            billed_entity,
            assigned_entity,
            supplier_id,
            location_id,
            status_id,
            // created_by,
          }
        ];

        return status.ResponseStatus(res, 200, `Details of Computer(${computer_id})`, computer);
      }
      return status.ResponseStatus(res, 400, `No data found for ${computer_id}`);
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  updateComputerByComputerId: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      }
      const computer_id = req.params.computer_id;

      // Access uploaded files
      const { files } = req;

      const { computerName, invoice, po, warrenty, assettag, purchasedate, serial, assignedto, hostname, osname, osversion, osmanufacturer, osbuildtype, osconfiguration, registeredowner, productid, originalinstalldate, purchasecost, systemmanufacturer, systemmodel, processor, domain, sophos, sapphire, systemtype, biosversion, windowsdirectory, systemdirectory, systemlocale, timezone, totalphysicalram, virtualrammax, virtualramavailable, installedsoftware, updatedBy, ordernumber, billedentity, assignedentity, supplier, location, assetStatus, updatedAt } = req.body;
      const computerData = {
        name: computerName,
        asset_tag: assettag,
        serial: serial,
        warrenty: warrenty,
        // assigned_to: assignedto,
        host_name: hostname,
        purchase_date: purchasedate,
        os_name: osname,
        os_version: osversion,
        os_manufacturer: osmanufacturer,
        os_build_type: osbuildtype,
        os_configuration: osconfiguration,
        registered_owner: registeredowner,
        product_id: productid,
        original_install_date: originalinstalldate,
        system_manufacturer: systemmanufacturer,
        system_model: systemmodel,
        processor: processor,
        domain: domain,
        sophos: sophos,
        sapphire: sapphire,
        system_type: systemtype,
        bios_version: biosversion,
        windows_directory: windowsdirectory,
        system_directory: systemdirectory,
        system_locale: systemlocale,
        time_zone: timezone,
        total_physical_ram: totalphysicalram,
        virtual_ram_max: virtualrammax,
        virtual_ram_available: virtualramavailable,
        installed_software: installedsoftware,
        order_number: ordernumber,
        purchase_cost: purchasecost,
        billed_entity: billedentity,
        assigned_entity: assignedentity,
        supplier_id: supplier,
        location_id: location,
        status_id: assetStatus,
        // updated_at: updatedAt,
        updated_by: updatedBy,
        invoice: invoice,
        po: po,
      }
      const result = await ComputerModel.updateComputerByCondition({ computer_id }, computerData);
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "Computer updated successfully");
      }
      return status.ResponseStatus(res, 400, `Failed to update Computer`);
    } catch (error) {
      console.log(error.message);
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  deleteComputerByComputerId: async (req, res) => {
    try {
      const computer_id = req.params.computer_id;
      const result = await ComputerModel.deleteComputerByCondition({ computer_id });
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "Computer deleted successfully");
      }
      return status.ResponseStatus(res, 400, 'Failed to delete Computer');

    } catch (error) {
      //   if(error.errno === 1451){
      //     return status.ResponseStatus(res, 500, "Deletion failed. The selected Computer is associated with existing data.",{error:error})
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

module.exports = computerController;