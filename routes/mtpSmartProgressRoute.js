const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
let receivedData = {};
const homeController = require("../controllers/controller_home");
const mainController = require("../controllers/controller_main.js");
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

router.get("/", homeController.redirectToLogin);

router.get("/main", mainController.renderMain); // prem
router.get("/", mainController.MainPage); // prem
// router.post("/testeregisterr", mainController.executeStoredProcedure); //prem
// router.post("/test", (req, res) => {
//   const { Register_No } = req.body;

//   if (!Register_No) {
//     return res.status(400).json({ error: "Register_No is required" });
//   }

//   console.log(`Received Register_No: ${Register_No}`);
//   // Send a response back to the client
//   res.json({
//     message: "Data received successfully",
//     receivedData: Register_No,
//   });
// });

router.get(
  "/fetchDataByRegisterNo/:Register_No",
  mainController.fetchRegisterNo
);
router.get("/getRegister", mainController.getRegister);
//////////////////////////////////////////// Encryption and Decryption ////////////////////////////////////////////
router.get("/Encryption/:nid", encryptionDecryption_Controller.encryptedData);
router.get("/Decryption/:codex", encryptionDecryption_Controller.decryptedData);
//////////////////////////////////////////// Encryption and Decryption ////////////////////////////////////////////

module.exports = router;
