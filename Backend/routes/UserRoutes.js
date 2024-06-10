// routes/users.js

const express = require("express");
const { protect } = require("../middlewares/AuthMiddleware");
const {
  getUserDetails,
  updateUserDetails,
  deleteUser,
  listAllUsers,
} = require("../controllers/UserController");
const router = express.Router();

router
  .route("/:id")
  .get(protect, getUserDetails)
  .put(protect, updateUserDetails)
  .delete(protect, deleteUser);

router.get("/", protect, listAllUsers);

module.exports = router;
