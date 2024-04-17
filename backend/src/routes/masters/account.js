const express = require("express");
const accountController = require("../../controllers/masters/account");
const router = express.Router();
const multer = require( "multer" );
const validation = require("../../middlewares/masters/accountValidator");
const { constants } = require("fs/promises");

// Import the uploadFiles method from the account controller
const { uploadFiles } = accountController;

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
router.route('/account_list')
  .get(accountController.getAllAccounts);
  
router
  .route("/accounts")
  .get(accountController.getAllAccountsWithMappedData)
  .post(validation.createAccount, accountController.createAccount);

router
  .route("/accounts/:account_id")
  .get(accountController.getAccountByAccountIdWithMappedData)
  .put(validation.updateAccount, accountController.updateAccountByAccountId)
  .delete(accountController.deleteAccountByAccountId);

module.exports = router;
