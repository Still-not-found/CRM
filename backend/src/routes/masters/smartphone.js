const express = require("express");
const smartphoneController = require("../../controllers/masters/smartphone");
const router = express.Router();
const validation = require("../../middlewares/masters/smartphoneValidator");

router.route('/smartphone_list')
  .get(smartphoneController.getAllSmartphones);
  
router
  .route("/smartphones")
  .get(smartphoneController.getAllSmartphonesWithMappedData)
  .post(validation.createSmartphone, smartphoneController.createSmartphone);

router
  .route("/smartphones/:smartphone_id")
  .get(smartphoneController.getSmartphoneBySmartphoneIdWithMappedData)
  .put(validation.updateSmartphone, smartphoneController.updateSmartphoneBySmartphoneId)
  .delete(smartphoneController.deleteSmartphoneBySmartphoneId);

module.exports = router;
