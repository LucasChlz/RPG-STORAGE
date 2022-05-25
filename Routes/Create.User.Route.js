const express = require("express");
const router = express.Router();

const UserController = require('../Controllers/User.Controller')

router.post('/create', UserController.create);

module.exports = router;