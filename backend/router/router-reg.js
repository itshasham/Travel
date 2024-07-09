const express = require('express');
const router = express.Router();
const authController = require('../controller/reg-controller');
const signupSchema=require('../validators/reg-validator');

const validate=require("../middleware/validate-middleware")
// Define your routes here

router.get('/home',authController.home);
router.post('/login', authController.login);
// router.post('/register', authController.register);
router.route("/register").post(authController.register);
module.exports = router;