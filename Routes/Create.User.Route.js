const express = require("express");
const router = express.Router();

const UserController = require('../Controllers/User.Controller')

router.get('/', UserController.hello);

module.exports = router;