const express = require("express");
const uworkstationController = require("../../controllers/masters/uworkstation");
const router = express.Router();
const validation = require("../../middlewares/masters/uworkstationValidator");

router.route('/uworkstation_list')
  .get(uworkstationController.getAllUWorkstations);
  
router
  .route("/uworkstations")
  .get(uworkstationController.getAllUWorkstationsWithMappedData)
  .post(validation.createUWorkstation, uworkstationController.createUWorkstation);

router
  .route("/uworkstations/:uworkstation_id")
  .get(uworkstationController.getUWorkstationByUWorkstationIdWithMappedData)
  .put(validation.updateUWorkstation, uworkstationController.updateUWorkstationByUWorkstationId)
  .delete(uworkstationController.deleteUWorkstationByUWorkstationId);

module.exports = router;
