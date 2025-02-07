const db = require("../database/db_main.js");
const { poolPromise } = require("../database/db_main.js"); // อ้างอิงไฟล์ model ของคุณ

async function renderMain(req, res) {
  res.render("main");
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
  console.log("Controller log: " + Register_No);

  if (!{ Register_No }) {
    return res
      .status(400)
      .json({ success: false, error: "Register_No is required" });
  }

  try {
    // Call the function to execute the stored procedure
    const data = await db.executeStoredProcedureWithParams(Register_No);
    // console.log("data : ", data);
    // res.redirect("/mtp/main");
    // Send the result back to the client
    // ส่งค่า Register_No ไปยัง EJS Template
    // return res.json({ success: true, data });
    console.log('Register_No', Register_No)
    console.log('data',data)
    res.send(Register_No, data)
    // return res.render('main', { Register_No: Register_No, data });
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

async function getRegister(req, res) {
  try {
    const {getRegisterNo} = req.params
    console.log(getRegisterNo);
    res.send(getRegisterNo)
  } catch (error) {
    console.error(`Error executing stored procedure: ${error.message}`);
    res.status(500).send({
      message: "Error executing stored procedure",
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
