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
  const { Register_No } = req.body;
  console.log("Controller log: " + Register_No);
  if (!{ Register_No }) {
    return res
      .status(400)
      .json({ success: false, error: "Register_No is required" });
  }
  try {
    // Call the function to execute the stored procedure
    const data = await db.executeStoredProcedureWithParams(Register_No);
    if (data.success) {
      req.session.Register_No = Register_No;
      res.redirect("/mtp/main");
    } else {
      // Consider using more specific status codes based on the error type
      res.status(500).json({ message: result.message });
    }
    // Send the result back to the client
    return res.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    // Send a sanitized error response
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
      message: error.message, // Optional: include the error message for debugging
    });
  }
}

async function executeStoredProcedure(req, res, Register_No) {
  try {
    // Register_No = req.body; // Destructure the field you're expecting
    console.log(Register_No);

    if (!Register_No || typeof Register_No !== "string") {
      return res
        .status(400)
        .send({ message: "Invalid or missing Register_No" });
    }

    // Call the database function and pass the parameters
    const result = await db.executeStoredProcedureWithParams(Register_No);
    if (!result || result.length === 0) {
      return res
        .status(404)
        .send({ message: "No found for the given Register_No" });
    }
    // Return a success response with the result
    res.status(200).send({ success: true, data: result });
  } catch (error) {
    console.error(`Error executing stored procedure: ${error.message}`);
    res
      .status(500)
      .send({
        message: "Error executing stored procedure",
        error: error.message,
      });
  }
}

module.exports = {
  renderMain,
  MainPage,
  SubPage,
  executeStoredProcedure,
  fetchRegisterNo,
};
