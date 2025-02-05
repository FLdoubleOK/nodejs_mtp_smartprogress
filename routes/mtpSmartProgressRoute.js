const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const homeController = require('../controllers/controller_home');

const encryptionDecryption_Controller = require('../controllers/encryptionDecryption_Controller');
//////////////////////////////////////////// Connect SQL ////////////////////////////////////////////
// const { connect_sql } = require("../controllers/connectController");
const connect_sql = require("../controllers/connectController");

router.get('/params', connect_sql.getConnect);
router.get('/test', connect_sql.test);

router.get('/', homeController.redirectToLogin);



//////////////////////////////////////////// Encryption and Decryption ////////////////////////////////////////////
router.get('/Encryption/:nid', encryptionDecryption_Controller.encryptedData);
router.get('/Decryption/:codex', encryptionDecryption_Controller.decryptedData);
//////////////////////////////////////////// Encryption and Decryption ////////////////////////////////////////////


module.exports = router;
