const ProductModel = require('../../models/masters/product');
const status = require('../../helpers/Response');
const multer = require("multer");
const qs = require("querystring");
const { validationResult } = require('express-validator');
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
const { APP_URL } = process.env;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads/")); // Directory where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Rename files if needed
  }
});

const storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname)
  },
})

const uploadStorage = multer({ storage: storage1 })

const upload = multer({ storage: storage });

const productController = {
  createProduct: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      };
      // Access uploaded files
      const { files } = req;

      console.log(req.body);
      const { Name, description, price, quantity, createdBy } = req.body;
      const productData = {
        name: Name,
        description: description,
        price: price,
        quantity: quantity,
        created_by: createdBy,
        modified_by: createdBy,
      }
      // console.log(productData);
      const result = await ProductModel.createProduct(productData);
      console.log(result);
      if (result.insertId > 0) {
        return status.ResponseStatus(res, 201, "Product created successfully");
      }
      return status.ResponseStatus(res, 400, "Failed to create Product");
    } catch (error) {
      console.log(error);
      return status.ResponseStatus(res, 500, 'Internal server error', { error: error.message });
    }
  },
  getAllProducts: async (req, res) => {
    try {
      const products = await ProductModel.getAllProducts();
      if (products.length > 0) {
        return status.ResponseStatus(res, 200, "List of all Products", products);
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  getAllProductsWithMappedData: async (req, res) => {
    try {
      const rows = await ProductModel.getAllProductsWithMappedData();
      if (rows.length > 0) {
        return status.ResponseStatus(res, 200, "List of all Products", rows);
      }
      return status.ResponseStatus(res, 400, "No data found");
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  getProductByProductIdWithMappedData: async (req, res) => {
    try {
      const product_id = req.params.product_id;

      const rows = await ProductModel.getProductByProductIdWithMappedData(product_id);
      if (rows.length > 0) {
        const {
          id,
          product_id,
          name,
            description,
            price,
            quantity,
          created_by,
          modified_by,
          
        } = rows[0];

        const product = [
          {
            id,
            product_id,
            name,
              description,
              price,
              quantity,
            created_by,
            modified_by,
          }
        ];

        return status.ResponseStatus(res, 200, `Details of Product(${product_id})`, product);
      }
      return status.ResponseStatus(res, 400, `No data found for ${product_id}`);
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  updateProductByProductId: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return status.ResponseStatus(res, 400, "Validation Failed", errors);
      }
      const product_id = req.params.product_id;

      // Access uploaded files
      const { files } = req;

      const { Name, description, price, quantity, modifiedBy } = req.body;
      const productData = {
        name: Name,
        description: description,
        price: price,
        quantity: quantity,
        modified_by: modifiedBy,
      }
      const result = await ProductModel.updateProductByCondition({ product_id }, productData);
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "Product updated successfully");
      }
      return status.ResponseStatus(res, 400, `Failed to update Product`);
    } catch (error) {
      console.log(error.message);
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  deleteProductByProductId: async (req, res) => {
    try {
      const product_id = req.params.product_id;
      const result = await ProductModel.deleteProductByCondition({ product_id });
      if (result.affectedRows > 0) {
        return status.ResponseStatus(res, 200, "Product deleted successfully");
      }
      return status.ResponseStatus(res, 400, 'Failed to delete Product');

    } catch (error) {
      //   if(error.errno === 1451){
      //     return status.ResponseStatus(res, 500, "Deletion failed. The selected Product is associated with existing data.",{error:error})
      // }
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  },

  // Controller to handle file upload
  uploadFiles: async (req, res) => {
    try {
      // Access uploaded files
      const { files } = req;

      // Process uploaded files as needed

      return status.ResponseStatus(res, 200, "Files uploaded successfully", { files });
    } catch (error) {
      return status.ResponseStatus(res, 500, "Internal server error", { error: error.message });
    }
  }
};

module.exports = productController;