const AccountModel = require('../../models/masters/account');
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

const accountController = {
  createAccount: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      };

      // Access uploaded files
      const { files } = req;

      console.log(req.body);
      const { accName, shippingStreet, shippingCity, shippingState, shippingPincode, shippingCountry, description, industry, annualRevenue, street, phone, website, type, assignedUser, panNumber, gstNumber, email, address, city, state, postalCode, country, officePhone, modifiedBy, createdBy } = req.body;
      const accountData = {
        name: accName,
        shipping_street: shippingStreet,
        shipping_city: shippingCity,
        shipping_country: shippingCountry,
        shipping_pincode: shippingPincode,
        shipping_state: shippingState,
        description: description,
        industry: industry,
        email: email,
        annual_revenue: annualRevenue,
        website: website,
        phone: phone,
        type: type,
        pan_number: panNumber,
        gst_number: gstNumber,
        assigned_user_id: assignedUser,
        street: street,
        city: city,
        state:state,
        postal_code: postalCode,
        country: country,
        created_by: createdBy,
        modified_by: createdBy,
      }
      // console.log(accountData);
      const result = await AccountModel.createAccount(accountData);
      console.log(result);
      if (result.insertId > 0) {
        return status.ResponseStatus(res, 201, "Account created successfully");
      }
      return status.ResponseStatus(res, 400, "Failed to create Account");
    } catch (error) {
      console.log(error);
      return status.ResponseStatus(res, 500, 'Internal server error', { error: error.message });
    }
  },
  getAllAccounts: async (req, res) => {
    try {
      const accounts = await AccountModel.getAllAccounts();
      if (accounts.length > 0) {
        return status.ResponseStatus(res, 200, "List of all Accounts", accounts);
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  getAllAccountsWithMappedData: async (req, res) => {
    try {
      const rows = await AccountModel.getAllAccountsWithMappedData();
      if (rows.length > 0) {
        return status.ResponseStatus(res, 200, "List of all Accounts", rows);
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  getAccountByAccountIdWithMappedData: async (req, res) => {
    try {
      const acc_id = req.params.acc_id;

      const rows = await AccountModel.getAccountByAccountIdWithMappedData(acc_id);
      if (rows.length > 0) {
        const {id,acc_id,shippingStreet, shippingCity, shippingState, shippingPincode, shippingCountry, description,name,industry,email,annual_revenue,website,phone,type,pan_number,gst_number,assigned_user_id,street,city,state,postal_code,country,modified_by,} = rows[0];

        const account = [{id,acc_id,name,shippingStreet, shippingCity, shippingState, shippingPincode, shippingCountry, description,industry,email,annual_revenue,website,phone,type,pan_number,gst_number,assigned_user_id,street,city,state,postal_code,country,modified_by,}];

        return status.ResponseStatus(res, 200, `Details of Account(${acc_id})`, account);
      }
      return status.ResponseStatus(res, 400, `No data found for ${acc_id}`);
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  updateAccountByAccountId: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      }
      const acc_id = req.params.acc_id;

      // Access uploaded files
      const { files } = req;

      const { accName, shippingStreet, shippingCity, shippingState, shippingPincode, shippingCountry, description, industry, annualRevenue, street, phone, website, type, assignedUser, panNumber, gstNumber, email, city, state, postalCode, country, modifiedBy,  } = req.body;
      const accountData = {
        name: accName,
        shipping_street: shippingStreet,
        shipping_city: shippingCity,
        shipping_country: shippingCountry,
        shipping_pincode: shippingPincode,
        shipping_state: shippingState,
        description: description,
        industry: industry,
        email: email,
        annual_revenue: annualRevenue,
        website: website,
        phone: phone,
        type: type,
        pan_number: panNumber,
        gst_number: gstNumber,
        assigned_user_id: assignedUser,
        street: street,
        city: city,
        state:state,
        postal_code: postalCode,
        country: country,
        modified_by: modifiedBy,
      }
      const result = await AccountModel.updateAccountByCondition({ acc_id }, accountData);
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "Account updated successfully");
      }
      return status.ResponseStatus(res, 400, `Failed to update Account`);
    } catch (error) {
      console.log(error.message);
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  deleteAccountByAccountId: async (req, res) => {
    try {
      const acc_id = req.params.acc_id;
      const result = await AccountModel.deleteAccountByCondition({ acc_id });
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "Account deleted successfully");
      }
      return status.ResponseStatus(res, 400, 'Failed to delete Account');

    } catch (error) {
      //   if(error.errno === 1451){
      //     return status.ResponseStatus(res, 500, "Deletion failed. The selected Account is associated with existing data.",{error:error})
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

module.exports = accountController;