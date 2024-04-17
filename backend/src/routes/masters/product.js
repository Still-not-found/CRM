const express = require("express");
const productController = require("../../controllers/masters/product");
const router = express.Router();
const multer = require( "multer" );
const validation = require("../../middlewares/masters/productValidator");
const { constants } = require("fs/promises");

// Import the uploadFiles method from the product controller
const { uploadFiles } = productController;

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
router.route('/product_list')
  .get(productController.getAllProducts);
  
router
  .route("/products")
  .get(productController.getAllProductsWithMappedData)
  .post(validation.createProduct, productController.createProduct);

router
  .route("/products/:product_id")
  .get(productController.getProductByProductIdWithMappedData)
  .put(validation.updateProduct, productController.updateProductByProductId)
  .delete(productController.deleteProductByProductId);

module.exports = router;
