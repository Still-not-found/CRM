const CompanyModel = require('../../models/masters/company');
const status = require('../../helpers/Response');
const { validationResult } = require('express-validator');

const companyController = {
  createCompany: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      };
      const { company, companycode, createdBy } = req.body;
      const companyData = {
        company_name: company,
        company_code: companycode,
        created_by: createdBy,
        updated_by: createdBy,
      }
      // console.log(companyData);
      const result = await CompanyModel.createCompany(companyData);
      console.log(result);
      if (result.insertId > 0) {
        return status.ResponseStatus(res, 201, "Company created successfully");
      }
      return status.ResponseStatus(res, 400, "Failed to create Company");
    } catch (error) {
      console.log(error);
      // console.log(error.message);
      return status.ResponseStatus(res, 500, 'Internal server error', { error: error.message });
    }
  },
  getAllCompanies: async (req, res) => {
    try {
      const companies = await CompanyModel.getAllCompanies();
      if (companies.length > 0) {
        return status.ResponseStatus(res, 200, "List of all Companies", companys);
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  getAllCompaniesWithMappedData: async (req, res) => {
    try {
      const rows = await CompanyModel.getAllCompaniesWithMappedData();
      if (rows.length > 0) {

        return status.ResponseStatus(res, 200, "List of all Companies", rows);
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  getCompanyByCompanyIdWithMappedData: async (req, res) => {
    try {
      const company_id = req.params.company_id;

      const rows = await CompanyModel.getCompanyByCompanyIdWithMappedData(company_id);
      if (rows.length > 0) {
        const {
          id,
          company_id,
          company_name,
          company_code,
        } = rows[0];

        const company = [
          {
            id,
            company_id,
            company_name,
            company_code,
          }
        ];

        return status.ResponseStatus(res, 200, `Details of Company(${company_id})`, company);
      }
      return status.ResponseStatus(res, 400, `No data found for ${company_id}`);
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  updateCompanyByCompanyId: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      };
      const company_id = req.params.company_id;
      const { company, companycode, updatedBy, updatedAt } = req.body;
      const companyData = {
        company_name: company,
        company_code: companycode,
        updated_at: updatedAt,
        updated_by: updatedBy,
      }
      const result = await CompanyModel.updateCompanyByCondition({ company_id }, companyData);
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "Company updated successfully");
      }
      return status.ResponseStatus(res, 400, `Failed to update Company`);
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },
  deleteCompanyByCompanyId: async (req, res) => {
    try {
      const company_id = req.params.company_id;
      const result = await CompanyModel.deleteCompanyByCondition({ company_id });
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "Company deleted successfully");
      }
      return status.ResponseStatus(res, 400, 'Failed to delete Company');
    } catch (error) {
      //   if(error.errno === 1451){
      //     return status.ResponseStatus(res, 500, "Deletion failed. The selected Company is associated with existing data.",{error:error})
      // }
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  }
};

module.exports = companyController;