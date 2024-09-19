const express = require('express')
const router = express.Router();
const productcontroller = require('../controllers/productcontrollers')

router.post('/products',productcontroller.addproducts);
router.get("/products",productcontroller.viewproducts);
router.get("/products/:id",productcontroller.viewsingleproduct);
router.delete('/products',productcontroller.deleteproducts);
router.put("/products",productcontroller.updateproduct);

module.exports = router;