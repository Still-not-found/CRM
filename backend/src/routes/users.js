const router = require("express").Router();
const usersController = require("../controllers/users");
const validation = require("../middlewares/userValidator");

router
  .route("/users")
  .get(usersController.getAllUsers)
  .post(validation.createUserSchema, usersController.createUser);
router
  .route("/users/:user_id")
  .get(usersController.getUserByUserId)
  .put(validation.createUserSchema, usersController.updateUserByUserId)
  .delete(usersController.deleteUserByUserId);

// router.get('/', usersController.getAllUsers);
// router.get('/:id', usersController.getUserById);
// router.post('/', usersController.createUser);

module.exports = router;
