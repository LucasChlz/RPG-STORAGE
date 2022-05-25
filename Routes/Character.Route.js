const express = require("express");
const router = express.Router();
const CharacterController = require('../Controllers/Character.controller.js')

router.post('/create', CharacterController.create);

module.exports = router;