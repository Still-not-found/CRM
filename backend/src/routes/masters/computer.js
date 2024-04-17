const express = require("express");
const computerController = require("../../controllers/masters/computer");
const router = express.Router();
const multer = require( "multer" );
const validation = require("../../middlewares/masters/computerValidator");
const { constants } = require("fs/promises");

// Import the uploadFiles method from the computer controller
const { uploadFiles } = computerController;

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
router.route('/computer_list')
  .get(computerController.getAllComputers);
  
router
  .route("/computers")
  .get(computerController.getAllComputersWithMappedData)
  .post(validation.createComputer, computerController.createComputer);

router
  .route("/computers/:computer_id")
  .get(computerController.getComputerByComputerIdWithMappedData)
  .put(validation.updateComputer, computerController.updateComputerByComputerId)
  .delete(computerController.deleteComputerByComputerId);

module.exports = router;
