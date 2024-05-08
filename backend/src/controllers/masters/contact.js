const ContactModel = require('../../models/masters/contact');
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

const contactController = {
  createContact: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      };

      // Access uploaded files
      const { files } = req;

      console.log(req.body);
      const { contactName,phone, CStatus, account, middelName, designation, gender, salutation, companyName, lead, lastName, leadSource, reportsTo, description, fax, mobile, department, jobTitle, email, address, city, state, postalCode, country, officePhone, modifiedBy, createdBy } = req.body;
      const contactData = {
        first_name: contactName,
        email: email,
        c_status: CStatus,
        // phone: phone,
        city: city,
        state:state,
        postal_code: postalCode,
        country: country,
        account_id: account,
        lead_id: lead,
        last_name: lastName,
        office_phone: officePhone,
        job_title: jobTitle,
        department: department,
        mobile: mobile,
        fax: fax,
        address: address,
        description: description,
        lead_source: leadSource,
        reports_to: reportsTo,
        middle_name: middelName,
        salutation: salutation,
        designation: designation,
        gender: gender,
        company_name: companyName,
        created_by: createdBy,
        modified_by: createdBy,
      }
      // console.log(contactData);
      const result = await ContactModel.createContact(contactData);
      console.log(result);
      if (result.insertId > 0) {
        return status.ResponseStatus(res, 201, "Contact created successfully");
      }
      return status.ResponseStatus(res, 400, "Failed to create Contact");
    } catch (error) {
      console.log(error);
      return status.ResponseStatus(res, 500, 'Internal server error', { error: error.message });
    }
  },
  getAllContacts: async (req, res) => {
    try {
      const contacts = await ContactModel.getAllContacts();
      if (contacts.length > 0) {
        return status.ResponseStatus(res, 200, "List of all Contacts", contacts);
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  getAllContactsWithMappedData: async (req, res) => {
    try {
      const rows = await ContactModel.getAllContactsWithMappedData();
      if (rows.length > 0) {
        return status.ResponseStatus(res, 200, "List of all Contacts", rows);
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  getContactByContactIdWithMappedData: async (req, res) => {
    try {
      const contact_id = req.params.contact_id;

      const rows = await ContactModel.getContactByContactIdWithMappedData(contact_id);
      if (rows.length > 0) {
        const {
          id,
          contact_id,
          account_id,
          lead_id,
          first_name,
          last_name,
          email,
          c_status,
          office_phone,
          job_title,
          department,
          mobile,
          fax,
          address,
          city,
          state,
          postal_code,
          country,
          description,
          lead_source,
          reports_to,
          middle_name,
          gender,
          salutation,
          designation,
          company_name,
          created_by,
          modified_by,
          
        } = rows[0];

        const contact = [
          {
            id,
            contact_id,
            account_id,
            lead_id,
            first_name,
            c_status,
            last_name,
            email,
            office_phone,
            job_title,
            department,
            mobile,
            fax,
            address,
            city,
            state,
            postal_code,
            country,
            description,
            lead_source,
            reports_to,
            middle_name,
          gender,
          salutation,
          designation,
          company_name,
            created_by,
            modified_by,  
          }
        ];

        return status.ResponseStatus(res, 200, `Details of Contact(${contact_id})`, contact);
      }
      return status.ResponseStatus(res, 400, `No data found for ${contact_id}`);
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  updateContactByContactId: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      }
      const contact_id = req.params.contact_id;

      // Access uploaded files
      const { files } = req;

      const { contactName, phone, CStatus, account, middelName, designation, gender, salutation, companyName, lead, lastName, leadSource, reportsTo, description, fax, mobile, department, jobTitle, email, address, city, state, postalCode, country, officePhone, modifiedBy, createdBy } = req.body;
      const contactData = {
        first_name: contactName,
        email: email,
        // phone: phone,
        city: city,
        state:state,
        c_status: CStatus,
        postal_code: postalCode,
        country: country,
        account_id: account,
        lead_id: lead,
        last_name: lastName,
        office_phone: officePhone,
        job_title: jobTitle,
        department: department,
        mobile: mobile,
        fax: fax,
        address: address,
        description: description,
        lead_source: leadSource,
        reports_to: reportsTo,
        middle_name: middelName,
        salutation: salutation,
        designation: designation,
        gender: gender,
        company_name: companyName,
        modified_by: modifiedBy,
      }
      const result = await ContactModel.updateContactByCondition({ contact_id }, contactData);
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "Contact updated successfully");
      }
      return status.ResponseStatus(res, 400, `Failed to update Contact`);
    } catch (error) {
      console.log(error.message);
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  deleteContactByContactId: async (req, res) => {
    try {
      const contact_id = req.params.contact_id;
      const result = await ContactModel.deleteContactByCondition({ contact_id });
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "Contact deleted successfully");
      }
      return status.ResponseStatus(res, 400, 'Failed to delete Contact');

    } catch (error) {
      //   if(error.errno === 1451){
      //     return status.ResponseStatus(res, 500, "Deletion failed. The selected Contact is associated with existing data.",{error:error})
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

module.exports = contactController;