const router = require("express").Router();
const authController = require('../controllers/auth');
const {createUserSchema, validateLogin} = require('../middlewares/userValidator');

router.post("/login",validateLogin, authController.login);
router.post("/logout",authController.logout);
router.post("/register",createUserSchema,authController.register);
router.get("/verify_email/:token",authController.verifyMail);
router.post("/forgot_password",authController.forgotPassword);
router.patch("/reset_password/:token",authController.resetPassword);
router.post("/verify_token/:token",authController.verifyToken);

module.exports = router;