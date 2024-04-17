const express = require("express");
const statusController = require("../../controllers/masters/status");
const router = express.Router();
const validation = require("../../middlewares/masters/statusValidator");

router.route('/status_list')
  .get(statusController.getAllStatus);
router
  .route("/status")
  .get(statusController.getAllStatusWithMappedData)
  .post(validation.createStatus, statusController.createStatus);

router
  .route("/status/:status_id")
  .get(statusController.getStatusByStatusIdWithMappedData)
  .put(validation.updateStatus, statusController.updateStatusByStatusId)
  .delete(statusController.deleteStatusByStatusId);

module.exports = router;
