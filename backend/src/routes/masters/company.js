const express = require("express");
const companyController = require("../../controllers/masters/company");
const router = express.Router();
const validation = require("../../middlewares/masters/companyValidator");

router.route('/company_list')
  .get(companyController.getAllCompanies);
router
  .route("/companies")
  .get(companyController.getAllCompaniesWithMappedData)
  .post(validation.createCompany, companyController.createCompany);

router
  .route("/companies/:company_id")
  .get(companyController.getCompanyByCompanyIdWithMappedData)
  .put(validation.updateCompany, companyController.updateCompanyByCompanyId)
  .delete(companyController.deleteCompanyByCompanyId);

module.exports = router;
