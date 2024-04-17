const express = require("express");
const leadController = require("../../controllers/masters/lead");
const router = express.Router();
const multer = require( "multer" );
const validation = require("../../middlewares/masters/leadValidator");
const { constants } = require("fs/promises");

// Import the uploadFiles method from the lead controller
const { uploadFiles } = leadController;

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
router.route('/lead_list')
  .get(leadController.getAllLeads);
  
router
  .route("/leads")
  .get(leadController.getAllLeadsWithMappedData)
  .post(validation.createLead, leadController.createLead);

router
  .route("/leads/:lead_id")
  .get(leadController.getLeadByLeadIdWithMappedData)
  .put(validation.updateLead, leadController.updateLeadByLeadId)
  .delete(leadController.deleteLeadByLeadId);

module.exports = router;
