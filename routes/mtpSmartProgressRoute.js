const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
let receivedData = {};
const homeController = require("../controllers/controller_home");
const mainController = require("../controllers/controller_main.js");
const maintenanceController = require("../controllers/controller_maintenance.js")
const encryptionDecryption_Controller = require("../controllers/encryptionDecryption_Controller");
//////////////////////////////////////////// Connect SQL ////////////////////////////////////////////
// const { connect_sql } = require("../controllers/connectController");
const connect_sqll = require("../controllers/connectController");
router.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2", "key3", "key4"],

    // Cookie Options
    maxAge: 1 * 60 * 60 * 1000, // 1hr
  })
);

router.use(bodyParser.json());

router.get("/params", connect_sqll.getConnect);



//router.get("/", homeController.redirectToLogin);

router.get("/main", mainController.renderMain); // prem
router.get("/", mainController.MainPage); // prem

router.get(
  "/fetchDataByRegisterNo/:Register_No",
  mainController.fetchRegisterNo
);
router.get("/Maintenance", maintenanceController.Maintenance);
router.post("/insert-status", maintenanceController.updateStatus);
//////////////////////////////////////////// Encryption and Decryption ////////////////////////////////////////////
router.get("/Encryption/:nid", encryptionDecryption_Controller.encryptedData);
router.get("/Decryption/:codex", encryptionDecryption_Controller.decryptedData);
//////////////////////////////////////////// Encryption and Decryption ////////////////////////////////////////////

module.exports = router;
