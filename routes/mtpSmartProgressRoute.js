const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const homeController = require('../controllers/controller_home');

router.get('/', homeController.redirectToLogin);

module.exports = router;
