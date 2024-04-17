const OpportunityModel = require('../../models/masters/opportunity');
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

const opportunityController = {
  createOpportunity: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      };

      // Access uploaded files
      const { files } = req;

      console.log(req.body);
      const { Name, lead, user, description, value,stage, probability, expectedCloseDate, account, opportunityAmount, type, leadSource, salesStage, assignedTo, createdBy } = req.body;
      const opportunityData = {
        name: Name,
        lead_id: lead,
        description: description,
        value: value,
        stage: stage,
        probability: probability,
        expected_close_date: expectedCloseDate,
        account_id: account,
        opportunity_amount: opportunityAmount,
        type: type,
        user_id: user,
        lead_source: leadSource,
        sales_stage: salesStage,
        assigned_to: assignedTo,
        created_by: createdBy,
        updated_by: createdBy,
      }
      // console.log(opportunityData);
      const result = await OpportunityModel.createOpportunity(opportunityData);
      console.log(result);
      if (result.insertId > 0) {
        return status.ResponseStatus(res, 201, "Opportunity created successfully");
      }
      return status.ResponseStatus(res, 400, "Failed to create Opportunity");
    } catch (error) {
      console.log(error);
      return status.ResponseStatus(res, 500, 'Internal server error', { error: error.message });
    }
  },
  getAllOpportunitys: async (req, res) => {
    try {
      const opportunitys = await OpportunityModel.getAllOpportunitys();
      if (opportunitys.length > 0) {
        return status.ResponseStatus(res, 200, "List of all Opportunitys", opportunitys);
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  getAllOpportunitysWithMappedData: async (req, res) => {
    try {
      const rows = await OpportunityModel.getAllOpportunitysWithMappedData();
      if (rows.length > 0) {
        return status.ResponseStatus(res, 200, "List of all Opportunitys", rows);
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  getOpportunityByOpportunityIdWithMappedData: async (req, res) => {
    try {
      const opportunities_id = req.params.opportunities_id;
console.log(opportunities_id);
      const rows = await OpportunityModel.getOpportunityByOpportunityIdWithMappedData(opportunities_id);
      if (rows.length > 0) {
        const {
          id,
          opportunities_id,
          user_id,
          lead_id,
        description,
        value,
        stage,
        probability,
        expected_close_date,
        account_id,
        opportunity_amount,
        type,
        lead_source,
        sales_stage,
        assigned_to,

        } = rows[0];

        const opportunity = [
          {
            id,
          opportunities_id,
          lead_id,
          user_id,
        description,
        value,
        stage,
        probability,
        expected_close_date,
        account_id,
        opportunity_amount,
        type,
        lead_source,
        sales_stage,
        assigned_to, 
          }
        ];

        return status.ResponseStatus(res, 200, `Details of Opportunity(${opportunities_id})`, opportunity);
      }
      return status.ResponseStatus(res, 400, `No data found for ${opportunities_id}`);
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  updateOpportunityByOpportunityId: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      }
      const opportunities_id = req.params.opportunities_id;

      // Access uploaded files
      const { files } = req;

      const { Name, lead, user, description, value,stage, probability, expectedCloseDate, account, opportunityAmount, type, leadSource, salesStage, assignedTo, updatedBy } = req.body;
      const opportunityData = {
        name: Name,
        lead_id: lead,
        description: description,
        value: value,
        user_id: user,
        stage: stage,
        probability: probability,
        expected_close_date: expectedCloseDate,
        account_id: account,
        opportunity_amount: opportunityAmount,
        type: type,
        lead_source: leadSource,
        sales_stage: salesStage,
        assigned_to: assignedTo,
        updated_by: updatedBy,
      }
      const result = await OpportunityModel.updateOpportunityByCondition({ opportunities_id }, opportunityData);
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "Opportunity updated successfully");
      }
      return status.ResponseStatus(res, 400, `Failed to update Opportunity`);
    } catch (error) {
      console.log(error.message);
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  deleteOpportunityByOpportunityId: async (req, res) => {
    try {
      const opportunities_id = req.params.opportunities_id;
      const result = await OpportunityModel.deleteOpportunityByCondition({ opportunities_id });
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "Opportunity deleted successfully");
      }
      return status.ResponseStatus(res, 400, 'Failed to delete Opportunity');

    } catch (error) {
      //   if(error.errno === 1451){
      //     return status.ResponseStatus(res, 500, "Deletion failed. The selected Opportunity is associated with existing data.",{error:error})
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

module.exports = opportunityController;