const express = require("express");
const nrouterController = require("../../controllers/masters/nrouter");
const router = express.Router();
const validation = require("../../middlewares/masters/nrouterValidator");

router.route('/nrouter_list')
  .get(nrouterController.getAllNRouters);
  
router
  .route("/nrouters")
  .get(nrouterController.getAllNRoutersWithMappedData)
  .post(validation.createNRouter, nrouterController.createNRouter);

router
  .route("/nrouters/:nrouter_id")
  .get(nrouterController.getNRouterByNRouterIdWithMappedData)
  .put(validation.updateNRouter, nrouterController.updateNRouterByNRouterId)
  .delete(nrouterController.deleteNRouterByNRouterId);

module.exports = router;
