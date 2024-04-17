const express = require("express");
const accesspointController = require("../../controllers/masters/accesspoint");
const router = express.Router();
const validation = require("../../middlewares/masters/accesspointValidator");

router.route('/accesspoint_list')
  .get(accesspointController.getAllAccessPoints);
  
router
  .route("/accesspoints")
  .get(accesspointController.getAllAccessPointsWithMappedData)
  .post(validation.createAccesspoint, accesspointController.createAccessPoint);

router
  .route("/accesspoints/:accesspoint_id")
  .get(accesspointController.getAccessPointByAccessPointIdWithMappedData)
  .put(validation.updateAccesspoint, accesspointController.updateAccessPointByAccessPointId)
  .delete(accesspointController.deleteAccessPointByAccessPointId);

module.exports = router;
