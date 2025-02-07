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

router.get("/params", connect_sqll.getConnect);

router.get("/", homeController.redirectToLogin);

router.get("/main", mainController.renderMain); // prem
router.post("/register", mainController.MainPage); // prem
router.post("/tester", mainController.executeStoredProcedure); //prem
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

// router.post("/fetchDataByRegisterNo", async (req, res) => {
//   const { Register_No } = req.body;

//   if (!Register_No) {
//     return res
//       .status(400)
//       .json({ success: false, error: "Register_No is required" });
//   }

//   try {
//     // Call the function to execute the stored procedure
//     const data = await connect_sql.executeStoredProcedure(
//       Register_No
//     );

//     // Send the result back to the client
//     return res.json({ success: true, data });
//   } catch (error) {
//     console.error("Error fetching data:", error.message);

//     // Send a sanitized error response
//     return res.status(500).json({
//       success: false,
//       error: "Internal Server Error",
//       message: error.message, // Optional: include the error message for debugging
//     });
//   }
// });
router.post("/fetchDataByRegisterNo", mainController.fetchRegisterNo);

//////////////////////////////////////////// Encryption and Decryption ////////////////////////////////////////////
router.get("/Encryption/:nid", encryptionDecryption_Controller.encryptedData);
router.get("/Decryption/:codex", encryptionDecryption_Controller.decryptedData);
//////////////////////////////////////////// Encryption and Decryption ////////////////////////////////////////////

module.exports = router;
