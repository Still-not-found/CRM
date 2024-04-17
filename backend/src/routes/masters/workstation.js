const express = require("express");
const workstationController = require("../../controllers/masters/workstation");
const router = express.Router();
const validation = require("../../middlewares/masters/workstationValidator");

router.route('/workstation_list')
  .get(workstationController.getAllWorkstations);
  
router
  .route("/workstations")
  .get(workstationController.getAllWorkstationsWithMappedData)
  .post(validation.createWorkstation, workstationController.createWorkstation);

router
  .route("/workstations/:workstation_id")
  .get(workstationController.getWorkstationByWorkstationIdWithMappedData)
  .put(validation.updateWorkstation, workstationController.updateWorkstationByWorkstationId)
  .delete(workstationController.deleteWorkstationByWorkstationId);

module.exports = router;
