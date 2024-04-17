const express = require("express");
const contactController = require("../../controllers/masters/contact");
const router = express.Router();
const multer = require( "multer" );
const validation = require("../../middlewares/masters/contactValidator");
const { constants } = require("fs/promises");

// Import the uploadFiles method from the contact controller
const { uploadFiles } = contactController;

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
router.route('/contact_list')
  .get(contactController.getAllContacts);
  
router
  .route("/contacts")
  .get(contactController.getAllContactsWithMappedData)
  .post(validation.createContact, contactController.createContact);

router
  .route("/contacts/:contact_id")
  .get(contactController.getContactByContactIdWithMappedData)
  .put(validation.updateContact, contactController.updateContactByContactId)
  .delete(contactController.deleteContactByContactId);

module.exports = router;
