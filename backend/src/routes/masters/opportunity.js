const express = require("express");
const opportunityController = require("../../controllers/masters/opportunity");
const router = express.Router();
const multer = require( "multer" );
const validation = require("../../middlewares/masters/opportunityValidator");
const { constants } = require("fs/promises");

// Import the uploadFiles method from the opportunity controller
const { uploadFiles } = opportunityController;

const storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/") // Folder to save
},
filename: (req, file, cb) => {
  cb(null, Date.now()+ "_"+file.originalname);
},
})

const uploadStorage = multer({ storage: storage1});

// Multiple files
router.post("/upload/single", uploadStorage.single('file'), (req, res)  => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Send back the filename or any other relevant data
  res.json({ fileName: req.file.filename });

  console.log(req.file)
  return res.send("Single file")
});
router.route('/opportunity_list')
  .get(opportunityController.getAllOpportunities);
  
router
  .route("/opportunities")
  .get(opportunityController.getAllOpportunitiesWithMappedData)
  .post(validation.createOpportunity, opportunityController.createOpportunity);

router
  .route("/opportunities/:opportunities_id")
  .get(opportunityController.getOpportunityByOpportunityIdWithMappedData)
  .put(validation.updateOpportunity, opportunityController.updateOpportunityByOpportunityId)
  .delete(opportunityController.deleteOpportunityByOpportunityId);

module.exports = router;
