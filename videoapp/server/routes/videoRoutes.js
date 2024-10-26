const express = require('express');
const router = express.Router();
const videoController = require("../controllers/videoControllers");

router.post('/videos',videoController.addVideo);
router.get('/videos',videoController.getAllVideos);

module.exports = router;

