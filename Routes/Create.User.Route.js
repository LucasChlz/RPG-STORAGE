const express = require("express");
const router = express.Router();
const UserController = require('../Controllers/User.Controller')

router.post('/create', UserController.create);
router.post('/login', UserController.login);
router.get('/logout', UserController.logout);

module.exports = router;