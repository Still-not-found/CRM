const LocationModel = require('../../models/masters/location');
const status = require('../../helpers/Response');
const { validationResult } = require('express-validator');

const locationController = {
  createLocation: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      };
      const { location, city, state, country, address, pincode, createdBy } = req.body;
      const locationData = {
        name: location,
        city: city,
        state: state,
        country: country,
        address: address,
        pincode: pincode,
        created_by: createdBy,
        updated_by: createdBy,
      }
      // console.log(locationData);
      const result = await LocationModel.createLocation(locationData);
      console.log(result);
      if (result.insertId > 0) {
        return status.ResponseStatus(res, 201, "Location created successfully");
      }
      return status.ResponseStatus(res, 400, "Failed to create Location");
    } catch (error) {
      console.log(error);
      return status.ResponseStatus(res, 500, 'Internal server error', { error: error.message });
    }
  },
  getAllLocations: async (req, res) => {
    try {
      const locations = await LocationModel.getAllLocations();
      if (locations.length > 0) {
        return status.ResponseStatus(res, 200, "List of all Locations", locations);
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  getAllLocationsWithMappedData: async (req, res) => {
    try {
      const rows = await LocationModel.getAllLocationsWithMappedData();
      if (rows.length > 0) {
        // let locations =[];
        // rows.map((row)=>{
        //     const {
        //         id,
        //         location_id,
        //         name,
        //         city,
        //         state,
        //         country,
        //         address,
        //         pincode,
        //     }= row;
        // });
        return status.ResponseStatus(res, 200, "List of all Locations", rows);
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  getLocationByLocationIdWithMappedData: async (req, res) => {
    try {
      const location_id = req.params.location_id;

      const rows = await LocationModel.getLocationByLocationIdWithMappedData(location_id);
      if (rows.length > 0) {
        const {
          id,
          location_id,
          name,
          city,
          state,
          country,
          address,
          pincode,

        } = rows[0];

        const location = [
          {
            id,
            location_id,
            name,
            city,
            state,
            country,
            address,
            pincode
          }
        ];

        return status.ResponseStatus(res, 200, `Details of Location(${location_id})`, location);
      }
      return status.ResponseStatus(res, 400, `No data found for ${location_id}`);
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  updateLocationByLocationId: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      }
      const location_id = req.params.location_id;
      const { location, city, state, country, address, pincode, updatedBy, updatedAt } = req.body;
      const locationData = {
        name: location,
        city: city,
        state: state,
        country: country,
        address: address,
        pincode: pincode,
        updated_at: updatedAt,
        updated_by: updatedBy,
      }
      const result = await LocationModel.updateLocationByCondition({ location_id }, locationData);
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "Location updated successfully");
      }
      return status.ResponseStatus(res, 400, `Failed to update Location`);
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  deleteLocationByLocationId: async (req, res) => {
    try {
      const location_id = req.params.location_id;
      const result = await LocationModel.deleteLocationByCondition({ location_id });
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "Location deleted successfully");
      }
      return status.ResponseStatus(res, 400, 'Failed to delete Location');

    } catch (error) {
      //   if(error.errno === 1451){
      //     return status.ResponseStatus(res, 500, "Deletion failed. The selected Location is associated with existing data.",{error:error})
      // }
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },
};

module.exports = locationController;