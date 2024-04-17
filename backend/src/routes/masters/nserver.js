const express = require("express");
const nserverController = require("../../controllers/masters/nserver");
const router = express.Router();
const validation = require("../../middlewares/masters/nserverValidator");

router.route('/nserver_list')
  .get(nserverController.getAllNServers);
  
router
  .route("/nservers")
  .get(nserverController.getAllNServersWithMappedData)
  .post(validation.createNServer, nserverController.createNServer);

router
  .route("/nservers/:nserver_id")
  .get(nserverController.getNServerByNServerIdWithMappedData)
  .put(validation.updateNServer, nserverController.updateNServerByNServerId)
  .delete(nserverController.deleteNServerByNServerId);

module.exports = router;
