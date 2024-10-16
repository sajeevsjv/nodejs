const express = require ('express');
const router = express.Router();
const movieController = require("../controllers/movieController")

router.post("/movies",movieController.addmovie);
router.get("/movies", movieController.getallmovies);
router.get("/movies/:id",movieController.getsinglemovie);
router.delete("/movies/:id",movieController.deletemovie);
router.put("/movies",movieController.updatemovie);


module.exports = router;