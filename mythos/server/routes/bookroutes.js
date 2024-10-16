const bookcontroller = require("../controllers/bookcontrollers")
const express = require('express');
const router = express.Router();

router.post("books",bookcontroller.addbook);


module.exports = router;