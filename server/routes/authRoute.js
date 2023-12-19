const express = require("express");
const {registerController, loginController, availableMoney} = require("../controllers/authController");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddlewares");

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/available-money/:userID', verifyToken, availableMoney)
module.exports = router