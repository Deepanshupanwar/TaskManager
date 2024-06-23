const express = require("express");
const {
  loginUser,
  registerUser,
  logout
} = require("../controllers/userController");

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", logout);

module.exports = router;