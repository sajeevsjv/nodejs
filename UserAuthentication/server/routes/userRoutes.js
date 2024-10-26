const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");


router.post("/otp-verification",userController.otpVerification);
router.post("/signup",userController.signup);

module.exports = router;