const AccessoryModel = require('../../models/masters/accessory');
const status = require('../../helpers/Response');
const { validationResult } = require('express-validator');

const accessoryController ={
    createAccessory: async(req,res)=>{
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
              return status.ResponseStatus(res,400,"Validation Failed",errors);
            };
            const {accessory, city, state, country, address, pincode, createdBy}=req.body;
            const accessoryData ={
              name: accessory,
              city,
              state,
              country,
              address,
              pincode,
              
            }
            console.log(accessoryData);
           const result = await AccessoryModel.createAccessory(accessoryData);
           console.log(result);
           if (result.affectedRows>0){
            return status.ResponseStatus(res,201,"Accessory created successfully");
           }
            return status.ResponseStatus(res,400,"Failed to create Accessory");
          } catch (error) {
            console.log(error);
            console.log(error.message);
            return status.ResponseStatus(res,500,'Internal server error', { error: error.message});
          }
    },
    getAllAccessorys: async (req, res)=>{
        try{
            const accessorys = await AccessoryModel.getAllAccessorys();
            if(accessorys.length>0){
              return status.ResponseStatus(res,200,"List of all Accessorys",accessorys);
            }
            return status.ResponseStatus(res,400,"No data found");
        } catch (error) {
          return status.ResponseStatus(res,500,"Internal server error",{error:error.message});
        }
    },
    getAccessoryByAccessoryId: async(req, res)=>{
        try{
            const accessory_id = req.params.accessory_id;
            const accessory = await CountryModel.getAccessoryByCondition({accessory_id});
            if(accessory.length>0){
              return status.ResponseStatus(res,200,`Details of Accessorys(${accessory_id})`,accessory);
            }
            return status.ResponseStatus(res,400,`No data found for ${accessory_id}`);
        } catch (error) {
          return status.ResponseStatus(res,500,"Internal server error",{error:error.message});
        }
    },
    updateAccessoryByAccessoryId: async (req, res)=>{
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
              return status.ResponseStatus(res,400,"Validation Failed",errors);
            };
            const accessory_id = req.params.accessory_id;
            const {accessory, city, state, country, createdAt, updatedAt}=req.body;
            const accessoryData ={
              name: accessory,
              city: city,
              state: state,
              country: country,
              
            }
            const result= await AccessoryModel.updateAccessoryByCondition({accessory_id},accessoryData);
            if(result.affectedRows>0){
              return status.ResponseStatus(res,200,"Accessory updated successfully");
            }
            return status.ResponseStatus(res,400,`Failed to update Accessory`);
          } catch (error) {
            return status.ResponseStatus(res,500,"Internal server error",{error:error.message});
          }
    },
    deleteAccessoryByAccessoryId: async (req, res)=>{
        try {
            const accessory_id = req.params.accessory_id;
            const result = await AccessoryModel.deleteAccessoryByCondition({accessory_id});
            if(result.affectedRows>0){
              return status.ResponseStatus(res,200,"Accessory deleted successfully");
            }
            return status.ResponseStatus(res,400,'Failed to delete Accessory');
          } catch (error) {
            if(error.errno === 1451){
              return status.ResponseStatus(res, 500, "Deletion failed. The selected Accessory is associated with existing data.",{error:error})
          }
            return status.ResponseStatus(res,500,"Internal server error",{error:error.message});
          }
    }
};

module.exports = accessoryController;