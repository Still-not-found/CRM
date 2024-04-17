const express = require("express");
const consumableController = require("../../controllers/masters/consumable");
const validation = require("../../middlewares/masters/consumableValidator");
const router = express.Router();

router
  .route("/consumables")
  .get(consumableController.getAllConsumables)
  .post(validation.createConsumable, consumableController.createConsumable);

router
  .route("/consumables/:consumable_id")
  .get(consumableController.getConsumableByConsumableId)
  .put(validation.updateConsumable, consumableController.updateConsumableByConsumableId)
  .delete(consumableController.deleteConsumableByConsumableId);

module.exports = router;
