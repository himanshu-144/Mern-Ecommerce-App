const express = require("express");
const { productController,checkoutController, purchasedItemsController} = require("../controllers/productController");
const verifyToken = require("../middlewares/authMiddlewares");
const router = express.Router();

router.get('/', verifyToken, productController);  // get all products

router.post('/checkout', verifyToken, checkoutController);

router.get('/purchased-items/:customerID', verifyToken, purchasedItemsController)

module.exports = router;