const LeadModel = require('../../models/masters/lead');
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

const leadController = {
  createLead: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      };
      // Access uploaded files
      const { files } = req;

      console.log(req.body);
      const { leadName, gender, salutation, series, leadType, requestType, shippingCity,shippingState,shippingCountry,shippingPincode, description, leadStatus, source, interestLevel, firstName, lastName, officePhone, jobTitle, mobile, fax, department, accountName, email, leadSource, statusDescription, opportunityAmount, leadSourceDescription, referredBy, assignedTo, address, city, state, postalCode, country, shippingAddress, modifiedBy, createdBy } = req.body;
      const leadData = {
        title: leadName,
        shipping_city: shippingCity,
        shipping_country: shippingCountry,
        shipping_state: shippingState,
        shipping_pincode: shippingPincode,
        lead_status: leadStatus,
        office_phone: officePhone,
        description: description,
        source: source,
        interest_level: interestLevel,
        first_name: firstName,
        last_name: lastName,
        job_title: jobTitle,
        mobile: mobile,
        fax: fax,
        department: department,
        account_name: accountName,
        email: email,
        lead_source: leadSource,
        status_description: statusDescription,
        lead_source_description: leadSourceDescription,
        opportunity_amount:opportunityAmount,
        referred_by: referredBy,
        assigned_to: assignedTo,
        address: address,
        city: city,
        state:state,
        postal_code: postalCode,
        country: country,
        shipping_address: shippingAddress,
        gender: gender,
        series: series,
        lead_type: leadType,
        request_type: requestType,
        salutation: salutation,
        created_by: createdBy,
        modified_by: createdBy, 
      }
      // console.log(leadData);
      const result = await LeadModel.createLead(leadData);
      console.log(result);
      if (result.insertId > 0) {
        return status.ResponseStatus(res, 201, "Lead created successfully");
      }
      return status.ResponseStatus(res, 400, "Failed to create Lead");
    } catch (error) {
      console.log(error);
      return status.ResponseStatus(res, 500, 'Internal server error', { error: error.message });
    }
  },
  getAllLeads: async (req, res) => {
    try {
      const leads = await LeadModel.getAllLeads();
      if (leads.length > 0) {
        return status.ResponseStatus(res, 200, "List of all Leads", leads);
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  getAllLeadsWithMappedData: async (req, res) => {
    try {
      const rows = await LeadModel.getAllLeadsWithMappedData();
      if (rows.length > 0) {
        return status.ResponseStatus(res, 200, "List of all Leads", rows);
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  getLeadByLeadIdWithMappedData: async (req, res) => {
    try {
      const lead_id = req.params.lead_id;

      const rows = await LeadModel.getLeadByLeadIdWithMappedData(lead_id);
      if (rows.length > 0) {
        const {
          id,
          lead_id,
          title,
          lead_status,
        description,
        source,
        interest_level,
        first_name,
        last_name,
        job_title,
        mobile,
        department,
        fax,
        account_name,
        email,
        lead_source,
        status_description,
        lead_source_description,
        opportunity_amount,
        referred_by,
        assigned_to,
        address,
        city,
        state,
        postal_code,
        country,
        shipping_address,
        shipping_city,
        shipping_country,
        shipping_state,
        shipping_pincode,
        gender,
        series,
        lead_type,
        request_type,
        salutation

        } = rows[0];

        const lead = [
          {
            id,
            lead_id,
            title,
            lead_status,
        description,
        source,
        interest_level,
        first_name,
        last_name,
        job_title,
        mobile,
        department,
        fax,
        account_name,
        email,
        lead_source,
        status_description,
        lead_source_description,
        opportunity_amount,
        referred_by,
        assigned_to,
        address,
        city,
        state,
        postal_code,
        country,
        shipping_address,
        shipping_city,
        shipping_country,
        shipping_state,
        shipping_pincode, 
        gender,
        series,
        lead_type,
        request_type,
        salutation  
          }
        ];

        return status.ResponseStatus(res, 200, `Details of Lead(${lead_id})`, lead);
      }
      return status.ResponseStatus(res, 400, `No data found for ${lead_id}`);
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  updateLeadByLeadId: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      }
      const lead_id = req.params.lead_id;

      // Access uploaded files
      const { files } = req;

      const { leadName, gender, salutation, series, leadType, requestType, shippingCity,shippingState,shippingCountry,shippingPincode, description, leadStatus, source, interestLevel, firstName, lastName, officePhone, jobTitle, mobile, fax, department, accountName, email, leadSource, statusDescription, opportunityAmount, leadSourceDescription, referredBy, assignedTo, address, city, state, postalCode, country, shippingAddress, modifiedBy, createdBy } = req.body;
      const leadData = {
        title: leadName,
        shipping_city: shippingCity,
        shipping_country: shippingCountry,
        shipping_state: shippingState,
        shipping_pincode: shippingPincode,
        description: description,
        lead_status: leadStatus,
        office_phone: officePhone,
        source: source,
        interest_level: interestLevel,
        first_name: firstName,
        last_name: lastName,
        job_title: jobTitle,
        mobile: mobile,
        fax: fax,
        department: department,
        account_name: accountName,
        email: email,
        lead_source: leadSource,
        status_description: statusDescription,
        lead_source_description: leadSourceDescription,
        opportunity_amount:opportunityAmount,
        referred_by: referredBy,
        assigned_to: assignedTo,
        address: address,
        city: city,
        state:state,
        postal_code: postalCode,
        country: country,
        shipping_address: shippingAddress,
        modified_by: modifiedBy,
        gender: gender,
        series: series,
        lead_type: leadType,
        request_type: requestType,
        salutation: salutation,
        // invoice: invoice,
        // po: po,
      }
      const result = await LeadModel.updateLeadByCondition({ lead_id }, leadData);
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "Lead updated successfully");
      }
      return status.ResponseStatus(res, 400, `Failed to update Lead`);
    } catch (error) {
      console.log(error.message);
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  deleteLeadByLeadId: async (req, res) => {
    try {
      const lead_id = req.params.lead_id;
      const result = await LeadModel.deleteLeadByCondition({ lead_id });
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "Lead deleted successfully");
      }
      return status.ResponseStatus(res, 400, 'Failed to delete Lead');

    } catch (error) {
      //   if(error.errno === 1451){
      //     return status.ResponseStatus(res, 500, "Deletion failed. The selected Lead is associated with existing data.",{error:error})
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

module.exports = leadController;