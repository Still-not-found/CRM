const express = require("express");
const componentController = require("../../controllers/masters/component");
const validation = require("../../middlewares/masters/componentValidator");
const router = express.Router();

router
  .route("/components")
  .get(componentController.getAllComponents)
  .post(validation.createComponent, componentController.createComponent);

router
  .route("/components/:component_id")
  .get(componentController.getComponentByComponentId)
  .put(validation.updateComponent, componentController.updateComponentByComponentId)
  .delete(componentController.deleteComponentByComponentId);

module.exports = router;
