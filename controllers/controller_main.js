const db = require("../database/db_main.js");
const { poolPromise } = require("../database/db_main.js"); // อ้างอิงไฟล์ model ของคุณ
let globalRegister = null;
async function renderMain(req, res) {
  const Register_No = req.session?.Register_No || null;
  const data = req.session?.data || null;
  try{
  res.render("main", {Register_No, data});
  } catch (error) {
    console.error(`Error in renderMain: ${error.message}`);
    res.status(500).send({
      success: false,
      message: "Error rendering main page",
      error: error.message,
    });
  }
}

async function MainPage(req, res) {
  try {
    const result = await db.TestSelect();
    console.log(result.length);
    res.send(result);
  } catch (error) {
    console.error(`Error : ${error}`);
    res.status(500).send({ msg: `Error : ${error}` });
  }
}

async function SubPage(req, res) {
  try {
    const result = await db.Where_Register_No();
    console.log(result.length);
    res.send(result);
  } catch (error) {
    console.error(`Error : ${error}`);
    res.status(500).send({ msg: `Error : ${error}` });
  }
}
async function fetchRegisterNo(req, res) {
  const { Register_No } = req.params;
  globalRegister = Register_No;
  
  console.log("Controller log: " + Register_No);
  console.log("global log: " + globalRegister);
  if (!Register_No) {
    return res
      .status(400)
      .json({ success: false, error: "Register_No is required" });
  }

  try {
    req.session.Register_No = Register_No;
    console.log("session :", req.session.Register_No)
    // Call the function to execute the stored procedure
    const data = await db.executeStoredProcedureWithParams(Register_No);
    // return res.json({ success: true, data });
    req.session.data = data
    console.log("data", data);
    return res.status(200).render('main',{Register_No, data});
  } catch (error) {
    console.error("Error fetching data(controller):", error.message);
    // Send a sanitized error response
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
      message: error.message, // Optional: include the error message for debugging
    });
  }
}

async function getRegister(req, res, data) {
  const Register_No = req.session?.Register_No || null;
  console.log('session: ', Register_No)
  console.log('session data: ', data)
  // const Register_No = globalRegister  
  try {
    if (!globalRegister) {
      return res.status(400).json({
        success: false,
        error: "No Register_No set in the system",
      });
    }
    console.log("Global Register_No:", Register_No);
    res.status(200).send({
      success: true,
      Register_No: Register_No,
      data
    });
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).send({
      success: false,
      message: "Error fetching globalRegister",
      error: error.message,
    });
  }
}

module.exports = {
  renderMain,
  MainPage,
  SubPage,
  getRegister,
  fetchRegisterNo,
};
