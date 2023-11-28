const express = require("express");
const logController = require('../controllers/log');

const router = express.Router();

router.post('/login', logController.login);

module.exports = router;