const express = require("express");
const accessoryController = require("../../controllers/masters/accessory");
const validation = require("../../middlewares/masters/accessoryValidator");
const router = express.Router();

router
  .route("/accessorys")
  .get(accessoryController.getAllAccessorys)
  .post(validation.createAccessory, accessoryController.createAccessory);

router
  .route("/accessorys/:accessory_id")
  .get(accessoryController.getAccessoryByAccessoryId)
  .put(validation.updateAccessory, accessoryController.updateAccessoryByAccessoryId)
  .delete(accessoryController.deleteAccessoryByAccessoryId);

module.exports = router;
