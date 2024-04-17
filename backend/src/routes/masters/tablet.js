const express = require("express");
const tabletController = require("../../controllers/masters/tablet");
const router = express.Router();
const validation = require("../../middlewares/masters/tabletValidator");

router.route('/tablet_list')
  .get(tabletController.getAllTablets);
  
router
  .route("/tablets")
  .get(tabletController.getAllTabletsWithMappedData)
  .post(validation.createTablet, tabletController.createTablet);

router
  .route("/tablets/:tablet_id")
  .get(tabletController.getTabletByTabletIdWithMappedData)
  .put(validation.updateTablet, tabletController.updateTabletByTabletId)
  .delete(tabletController.deleteTabletByTabletId);

module.exports = router;
