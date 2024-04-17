const express = require("express");
const locationController = require("../../controllers/masters/location");
const router = express.Router();
const validation = require("../../middlewares/masters/locationValidator");

router.route('/location_list')
  .get(locationController.getAllLocations);

router
  .route("/locations")
  .get(locationController.getAllLocationsWithMappedData)
  .post(validation.createLocation, locationController.createLocation);

router
  .route("/locations/:location_id")
  .get(locationController.getLocationByLocationIdWithMappedData)
  .put(validation.updateLocation, locationController.updateLocationByLocationId)
  .delete(locationController.deleteLocationByLocationId);

module.exports = router;
